import os
import requests

# папка для сохранения
save_dir = "img"
os.makedirs(save_dir, exist_ok=True)

# словарь: имя файла -> url
images = {
    "pikachu.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "bulbasaur.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "charmander.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "squirtle.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "eevee.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
    "snorlax.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
    "mewtwo.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    "psyduck.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
    "jigglypuff.png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
}

for name, url in images.items():
    filepath = os.path.join(save_dir, name)
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"✅ Saved {name}")
    except Exception as e:
        print(f"❌ Error downloading {name}: {e}")
