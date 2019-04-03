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


path_to_extension = r'C:\Users\fluryd\AppData\Local\Google\Chrome\User Data\Default\Extensions\gighmmpiobklfepjocnamgkkbiglidom\3.42.0_0'

chrome_options = Options()
chrome_options.add_argument('load-extension=' + path_to_extension)


browser = webdriver.Chrome('chromedriver.exe', chrome_options=chrome_options)
browser.create_options()


browser.get('http://www.yifysubtitles.com/search?q=how+to+train+your+dragon:+the+hidden+world')
link = browser.find_element_by_class_name('media-heading')
link.click()
english_text = browser.find_element_by_xpath("//*[contains(text(), 'English')]")
english_subtitles_link = english_text.find_element_by_xpath("./../..").find_element_by_tag_name('a')
href = english_subtitles_link.get_attribute('href')

browser.get(href)
download_href = browser.find_element_by_class_name('download-subtitle').get_attribute('href')

file = ''
resp = urlopen(download_href)
with ZipFile(BytesIO(resp.read())) as zipfile:
  list_of_files = zipfile.namelist()
  for filename in list_of_files:
    if filename.endswith('.srt'):
      file = zipfile.extract(filename, 'subtitles')

subs = pysrt.open(file)

texts = list(map(lambda line: line.text, subs))

print(texts[55])