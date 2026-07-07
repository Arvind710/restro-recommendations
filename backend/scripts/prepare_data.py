import os
import json
import pandas as pd
import numpy as np
from datasets import load_dataset
import ftfy

def load_and_clean_data():
    print("Loading dataset from HuggingFace...")
    try:
        dataset = load_dataset("ManikaSaini/zomato-restaurant-recommendation", split="train")
    except Exception as e:
        print(f"Error loading dataset from HuggingFace: {e}")
        return

    df = dataset.to_pandas()
    print(f"Initial record count: {len(df)}")
    
    # Fix mojibake / encoding issues across string columns
    print("Fixing text encoding issues using ftfy...")
    for col in ['name', 'address', 'location', 'listed_in(city)', 'cuisines', 'dish_liked']:
        if col in df.columns:
            df[col] = df[col].apply(lambda x: ftfy.fix_text(str(x)) if pd.notna(x) else x)

    
    # 3. Filter to Bangalore
    df = df[df['listed_in(city)'].notna()]

    # 4. Clean rate column
    print("Cleaning rate column...")
    df['rate'] = df['rate'].astype(str)
    df['rate'] = df['rate'].str.replace(r'/5$', '', regex=True)
    df['rate'] = df['rate'].replace(['NEW', '-', '', 'nan', 'None'], np.nan)
    df['rate'] = df['rate'].str.strip()
    df['rate'] = pd.to_numeric(df['rate'], errors='coerce')
    df = df.dropna(subset=['rate'])
    # Clamp ratings > 5.0 to 5.0 (per evals edgecase)
    df['rate'] = df['rate'].clip(upper=5.0)
    df = df[df['rate'] >= 0.0]

    # 5. Clean approx_cost(for two people)
    print("Cleaning cost column...")
    df['approx_cost(for two people)'] = df['approx_cost(for two people)'].astype(str)
    df['approx_cost(for two people)'] = df['approx_cost(for two people)'].str.replace(',', '', regex=False)
    df['approx_cost(for two people)'] = df['approx_cost(for two people)'].str.replace('₹', '', regex=False)
    df['approx_cost(for two people)'] = df['approx_cost(for two people)'].str.strip()
    df['approx_cost(for two people)'] = pd.to_numeric(df['approx_cost(for two people)'], errors='coerce')
    df = df.dropna(subset=['approx_cost(for two people)'])
    df['approx_cost(for two people)'] = df['approx_cost(for two people)'].astype(int)

    # 6. Convert boolean-like text fields
    print("Cleaning boolean fields...")
    df['online_order'] = df['online_order'].map({'Yes': True, 'No': False}).fillna(False)
    df['book_table'] = df['book_table'].map({'Yes': True, 'No': False}).fillna(False)

    # 7. Parse comma-separated fields into lists
    print("Parsing lists...")
    def parse_list(x):
        if pd.isna(x) or str(x).strip() in ('', 'nan', 'None'):
            return []
        return [item.strip() for item in str(x).split(',') if item.strip()]

    df['cuisines'] = df['cuisines'].apply(parse_list)
    df['dish_liked'] = df['dish_liked'].apply(parse_list)

    # Remove empty cuisines rows if any? The requirements don't mention it, let's leave as is.

    # 8. Drop unnecessary columns
    print("Dropping unnecessary columns...")
    cols_to_drop = ['url', 'phone', 'reviews_list', 'menu_item']
    df = df.drop(columns=[col for col in cols_to_drop if col in df.columns], errors='ignore')

    # 9. Rename columns
    print("Renaming columns...")
    rename_map = {
        'rate': 'rating',
        'approx_cost(for two people)': 'cost_for_two',
        'listed_in(type)': 'listed_in_type',
        'listed_in(city)': 'listed_in_city'
    }
    df = df.rename(columns=rename_map)

    # Make sure votes is present and is int
    if 'votes' in df.columns:
        df['votes'] = pd.to_numeric(df['votes'], errors='coerce').fillna(0).astype(int)

    # 10. Deduplicate by name + address
    print("Deduplicating...")
    df['temp_name_lower'] = df['name'].str.lower().str.strip()
    df['temp_address_lower'] = df['address'].str.lower().str.strip()
    df = df.drop_duplicates(subset=['temp_name_lower', 'temp_address_lower'])
    df = df.drop(columns=['temp_name_lower', 'temp_address_lower'])

    # 12. Normalize location
    print("Normalizing location...")
    df['location'] = df['location'].fillna("").astype(str)
    df['location'] = df['location'].str.strip().str.title()
    df['location'] = df['location'].str.replace('Indira Nagar', 'Indiranagar', case=False)
    df = df[df['location'] != ""]

    # 11. Assign id
    df['id'] = range(1, len(df) + 1)

    # Export to dicts
    # Handle NaN in string columns (like rest_type)
    df = df.replace({np.nan: None})
    records = df.to_dict(orient='records')

    # 13. Export to backend/data/restaurants.json
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, 'restaurants.json')
    
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(records, f, ensure_ascii=False, indent=2)

    print(f"Successfully processed and saved {len(records)} records to {out_file}")

if __name__ == '__main__':
    load_and_clean_data()
