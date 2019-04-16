from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from zipfile import ZipFile
from urllib.request import urlopen
from io import BytesIO
from selenium.webdriver.chrome.options import Options
import re
import json
import pysrt
from flask import Flask
from flask import jsonify
from flask_cors import CORS
from itertools import groupby
import os
import string



def getTexts(imdb_id):
  # path_to_extension = r'C:\Users\fluryd\AppData\Local\Google\Chrome\User Data\Default\Extensions\gighmmpiobklfepjocnamgkkbiglidom\3.42.0_0'

  # chrome_options = Options()
  # chrome_options.add_argument('load-extension=' + path_to_extension)


  # browser = webdriver.Chrome('chromedriver.exe', chrome_options=chrome_options)
  # browser.create_options()

  subtitles_filename = 'subtitles/' + imdb_id + '.srt'
  exists = os.path.exists(subtitles_filename)

  if exists:
    subs = pysrt.open(subtitles_filename)
    texts = list(map(lambda line: line.text, subs))
    return texts

  browser = webdriver.Chrome('chromedriver.exe')


  browser.get('http://www.yifysubtitles.com/search?q=' + imdb_id)
  link = browser.find_element_by_class_name('media-heading')
  link.click()
  english_text = browser.find_element_by_xpath("//*[contains(text(), 'English')]")
  english_subtitles_link = english_text.find_element_by_xpath("./../..").find_element_by_tag_name('a')
  href = english_subtitles_link.get_attribute('href')

  browser.get(href)
  download_href = browser.find_element_by_class_name('download-subtitle').get_attribute('href')
  browser.quit()

  resp = urlopen(download_href)
  with ZipFile(BytesIO(resp.read())) as zipfile:
    list_of_files = zipfile.namelist()
    for filename in list_of_files:
      if filename.endswith('.srt'):
        file = zipfile.extract(filename, 'subtitles')
        os.rename(file, subtitles_filename)

  subs = pysrt.open(subtitles_filename)

  texts = list(map(lambda line: line.text, subs))
  return texts

def get_most_used_words(words):
  return sorted(set(words), key=words.count, reverse=True)

  
app = Flask(__name__)
CORS(app)

@app.route("/subtitles/<imdb_id>")
def hello_world(imdb_id):
  subtitles = getTexts(imdb_id)
  joined = ' '.join(subtitles)
  words = joined.lower().translate(str.maketrans('', '', string.punctuation)).split()
  most_common_words = open('most_common_words.txt').read().lower().splitlines()
  most_used_words = get_most_used_words(words)
  important_words = [x for x in most_used_words if x not in most_common_words]
  return jsonify(important_words[:100])

if __name__ == '__main__':
  app.run(host='0.0.0.0')


