#coding=utf8

import torch
import numpy as np

import torch.nn as nn
import torch.nn.functional as F

from PIL import Image
import PIL.ImageOps

from flask import Flask
from flask_cors import cross_origin
import json


def format_and_resize(get_path, set_path):
    image = Image.open(get_path)
    new_image = Image.new("RGB", image.size, "WHITE") 
    new_image.paste(image, (0, 0), image)
    inverted_image = PIL.ImageOps.invert(new_image)
    inverted_image = inverted_image.resize((32,32), Image.ANTIALIAS)
    inverted_image.convert('RGB').save(set_path, "PNG")  # Save as JPEG


def png_to_tensor(path):
    im = Image.open(path).convert('L')
    np_im = np.asarray(im, dtype=np.float32)
    np_im = np_im / 255
    tensor_im = torch.tensor(np_im)
    tensor_im.unsqueeze_(0)
    tensor_im.unsqueeze_(0)
    return tensor_im


def get_x_best_outputs(outputs, x):
    lst = outputs.tolist()[0]
    for i in range(0, len(lst)):
        lst[i] = [lst[i], i]
    lst.sort(reverse=True)
    output_preds = []
    for i in range(0, x):
        output_preds.append(lst[i][1])
    hiragana_classes = [ "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご", "さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ", "た", "だ", "ち", "ぢ", "つ", "づ", "て", "で", "と", "ど", "な", "に", "ぬ", "ね", "の", "は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "ゎ", "を", "ん" ]
    output_preds_hira = {}
    for i in range(0, len(output_preds)):
        output_preds_hira[str(i)] = hiragana_classes[i]
    return output_preds_hira


def pred_img(path, x):
    img = png_to_tensor(path)
    pred_output = net(img)
    return get_x_best_outputs(pred_output, x)

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16*5*5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 71)
        self.out = nn.Softmax(dim=1)


    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 16*5*5)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        x = self.out(x)
        return x


app = Flask(__name__)

@app.route('/')
@cross_origin()
def index():
    net = Net()
    PATH = './kanji-cnn-weighted-model.pth'
    net.load_state_dict(torch.load(PATH))
    format_and_resize('lien_vers_kanji.png', 'kanji_valide.png')
    pred_png = pred_img('kanji_valide.png', 5)
    return pred_png

"""def index():
    '''Index page route'''
<<<<<<< HEAD
    a = {'1':'雨', '2': '早', '3':'字' }
    return a
=======
    a = {'1':'百', '2': '早', '3':'字' }
    return a"""
>>>>>>> 549eb966a154d615d3684aa96339458c6a4ccfc6

