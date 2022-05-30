import time
import random
import requests
from bs4 import BeautifulSoup
import pandas as pd
from PIL import Image

URL = "http://webkinzpictureguide.shoutwiki.com/wiki/User:Gifted9/flooring"
URL1 = "http://webkinzpictureguide.shoutwiki.com/wiki/User:Gifted9/wallpaper"
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
tables = soup.findChildren('table')
my_table = tables[0]

rows = my_table.findChildren(['tr'])

tot = 0
for row in rows:
    tds = row.findChildren('td')
    for td in enumerate(tds):
        tot += 1
print(tot)


count = 0
with open('wallpapers.csv', 'w') as f:

    for row in rows:
        tds = row.findChildren('td')
        wallpaperName = "1st"

        for index, td in enumerate(tds):
            try:
                if (index == 0):
                    wallpaperName = td.findChildren('p')[0].text.strip()

                img_name = wallpaperName.replace(" ", "")

                if (index == 0):
                    img_name
                elif (index == 1):
                    img_name += f"Small"
                elif (index == 2):
                    img_name += f"Medium"
                elif (index == 3):
                    img_name += f"Large"

                img = td.findChildren('a')[0]
                image_url = "http://webkinzpictureguide.shoutwiki.com" + img['href']
                # print(image_url)

                # Open the new page to get the highres photo
                time.sleep(0 + random.uniform(0.1, 0.2))  # not to overload the server
                page2 = requests.get(image_url)
                soup_img = BeautifulSoup(page2.content, 'html.parser')

                fullImage = soup_img.find_all("td", class_="filehistory-selected")[0]
                # print(fullImage)

                img_link = fullImage.findChildren("a")[0]["href"]
                print(img_link)

                img = Image.open(requests.get(img_link, stream=True).raw)

                img.save(f'./Flooring/{img_name}.png')
                count += 1

            except Exception as e:
                print(e)
                time.sleep(4 + random.uniform(0.3, 0.8))  # not to overload the server

print(f"Done, downloaded {count} images")
