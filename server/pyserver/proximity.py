import torch.nn as nn
from matplotlib import cm as c
from torchvision import datasets, transforms
from matplotlib import cm as CM
import torchvision.transforms.functional as F
import json
import scipy
from scipy.ndimage.filters import gaussian_filter
from matplotlib import pyplot as plt
import glob
import os
import numpy as np
import PIL.Image as Image
import scipy.io as io
import collections
from torchvision import models
import shutil
import torch
import h5py
from flask import Flask, json
from flask_cors import CORS

companies = [{"id": 1, "name": "Company One"},
             {"id": 2, "name": "Company Two"}]

api = Flask(__name__)
cors = CORS(api, resources={r"*": {"origins": "*"}})


def save_net(fname, net):
  with h5py.File(fname, 'w') as h5f:
    for k, v in net.state_dict().items():
      h5f.create_dataset(k, data=v.cpu().numpy())


def load_net(fname, net):
  with h5py.File(fname, 'r') as h5f:
    for k, v in net.state_dict().items():
      param = torch.from_numpy(np.asarray(h5f[k]))
      v.copy_(param)


def save_checkpoint(state, is_best, task_id, filename='checkpoint.pth.tar'):
  torch.save(state, task_id + filename)
  if is_best:
    shutil.copyfile(task_id + filename, task_id + 'model_best.pth.tar')


class CSRNet(nn.Module):
  def __init__(self, load_weights=False):
    super(CSRNet, self).__init__()
    self.seen = 0
    self.frontend_feat = [64, 64, 'M', 128, 128,
                          'M', 256, 256, 256, 'M', 512, 512, 512]
    self.backend_feat = [512, 512, 512, 256, 128, 64]
    self.frontend = make_layers(self.frontend_feat)
    self.backend = make_layers(
        self.backend_feat, in_channels=512, dilation=True)
    self.output_layer = nn.Conv2d(64, 1, kernel_size=1)
    if not load_weights:
      mod = models.vgg16(pretrained=True)
      self._initialize_weights()
      fsd = collections.OrderedDict()
      for i in range(len(self.frontend.state_dict().items())):
        temp_key = list(self.frontend.state_dict().items())[i][0]
        fsd[temp_key] = list(mod.state_dict().items())[i][1]
        # self.frontend.state_dict().items()[i][1].data[:] = mod.state_dict().items()[i][1].data[:]

  def forward(self, x):
    x = self.frontend(x)
    x = self.backend(x)
    x = self.output_layer(x)
    return x

  def _initialize_weights(self):
    for m in self.modules():
      if isinstance(m, nn.Conv2d):
        nn.init.normal_(m.weight, std=0.01)
        if m.bias is not None:
          nn.init.constant_(m.bias, 0)
      elif isinstance(m, nn.BatchNorm2d):
        nn.init.constant_(m.weight, 1)
        nn.init.constant_(m.bias, 0)


def make_layers(cfg, in_channels=3, batch_norm=False, dilation=False):
  if dilation:
    d_rate = 2
  else:
    d_rate = 1
  layers = []
  for v in cfg:
    if v == 'M':
      layers += [nn.MaxPool2d(kernel_size=2, stride=2)]
    else:
      conv2d = nn.Conv2d(in_channels, v, kernel_size=3,
                         padding=d_rate, dilation=d_rate)
      if batch_norm:
        layers += [conv2d, nn.BatchNorm2d(v), nn.ReLU(inplace=True)]
      else:
        layers += [conv2d, nn.ReLU(inplace=True)]
      in_channels = v
  return nn.Sequential(*layers)


class CSRNet(nn.Module):
  def __init__(self, load_weights=False):
    super(CSRNet, self).__init__()
    self.seen = 0
    self.frontend_feat = [64, 64, 'M', 128, 128,
                          'M', 256, 256, 256, 'M', 512, 512, 512]
    self.backend_feat = [512, 512, 512, 256, 128, 64]
    self.frontend = make_layers(self.frontend_feat)
    self.backend = make_layers(
        self.backend_feat, in_channels=512, dilation=True)
    self.output_layer = nn.Conv2d(64, 1, kernel_size=1)
    if not load_weights:
      mod = models.vgg16(pretrained=True)
      self._initialize_weights()
      fsd = collections.OrderedDict()
      for i in range(len(self.frontend.state_dict().items())):
        temp_key = list(self.frontend.state_dict().items())[i][0]
        fsd[temp_key] = list(mod.state_dict().items())[i][1]
        # self.frontend.state_dict().items()[i][1].data[:] = mod.state_dict().items()[i][1].data[:]

  def forward(self, x):
    x = self.frontend(x)
    x = self.backend(x)
    x = self.output_layer(x)
    return x

  def _initialize_weights(self):
    for m in self.modules():
      if isinstance(m, nn.Conv2d):
        nn.init.normal_(m.weight, std=0.01)
        if m.bias is not None:
          nn.init.constant_(m.bias, 0)
      elif isinstance(m, nn.BatchNorm2d):
        nn.init.constant_(m.weight, 1)
        nn.init.constant_(m.bias, 0)


def make_layers(cfg, in_channels=3, batch_norm=False, dilation=False):
  if dilation:
    d_rate = 2
  else:
    d_rate = 1
  layers = []
  for v in cfg:
    if v == 'M':
      layers += [nn.MaxPool2d(kernel_size=2, stride=2)]
    else:
      conv2d = nn.Conv2d(in_channels, v, kernel_size=3,
                         padding=d_rate, dilation=d_rate)
      if batch_norm:
        layers += [conv2d, nn.BatchNorm2d(v), nn.ReLU(inplace=True)]
      else:
        layers += [conv2d, nn.ReLU(inplace=True)]
      in_channels = v
  return nn.Sequential(*layers)


# importing libraries
transform = transforms.Compose([
    transforms.ToTensor(), transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                                std=[0.229, 0.224, 0.225]),
])
model = CSRNet()
checkpoint = torch.load('0model_best.pth.tar',
                        map_location=torch.device('cpu'))
model.load_state_dict(checkpoint['state_dict'])


@api.route('/companies', methods=['GET', 'POST'])
def get_companies():
  diction = {}
  from resizeimage import resizeimage
  image = Image.open('abc.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1


#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) != 1:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {1: [sm, lg, count1]})

  image = Image.open('new1.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1

  #count = 1
  #b = []
  # for i in z:
  #  count = 1
  #  for j in z:
  #    if i != j:
  #      if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
  #        if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
  #          count = count + 1
  #  b = b + [count]
  #########################################################

    count = 1
    lis = {}
    k = 0
    for i in z:
      lis[k] = [i]
      count = 1
      for j in z:
        if i != j:
          if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
            if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
              count = count + 1
              lis[k] = lis[k] + [j]
      k = k + 1
      # #print(i,count)
    for i in range(0, k):
      for j in range(0, k):
        if i != j:
          if (all(x in lis[i] for x in lis[j])):
            lis[i] = ['o']
    li = {}
    j = 0

    for i in range(0, k):
      if len(lis[i]) > 5:
        li[j] = lis[i]
        j = j + 1
    # print(li)
    sm = []
    lg = []
    for i in range(0, j):
      smi = 100
      smj = 100
      lgi = 0
      lgj = 0
      for k in li[i]:
        for kk in li[i]:
          if k != kk:
            if k[0] <= kk[0] and k[0] < smi:
              smi = k[0]
            if k[1] <= kk[1] and k[1] < smj:
              smj = k[1]
            if k[0] >= kk[0] and k[0] > lgi:
              lgi = k[0]
            if k[1] >= kk[1] and k[1] > lgj:
              lgj = k[1]
      sm = sm + [[smi, smj]]
      lg = lg + [[lgi, lgj]]

  ##################################################################
  diction.update(
      {2: [sm, lg, count1]})
  from resizeimage import resizeimage
  image = Image.open('test5.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1

#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) != 1:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {3: [sm, lg, count1]})

  image = Image.open('new11.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1


#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) != 1:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {4: [sm, lg, count1]})

  image = Image.open('new111.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1


#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) != 1:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {5: [sm, lg, count1]})

  image = Image.open('test6.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1

#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) > 3:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {6: [sm, lg, count1]})

  image = Image.open('test7.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1

#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) != 1:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {7: [sm, lg, count1]})

  image = Image.open('test8.jpg')
  image = resizeimage.resize_cover(image, [370, 265])
  img = transform(image.convert('RGB'))
  output = model(img.unsqueeze(0))
  a = output.detach().cpu().reshape(
      output.detach().cpu().shape[2], output.detach().cpu().shape[3]).numpy()
  count1 = 0
  z = []
  ii = 0
  jj = 0
  for i in a:
    jj = 0
    for j in i:
      if j > 0.074:
        count1 = count1 + 1
        z = z + [[ii, jj]]
      jj = jj + 1
    ii = ii + 1

#########################################################

  count = 1
  lis = {}
  k = 0
  for i in z:
    lis[k] = [i]
    count = 1
    for j in z:
      if i != j:
        if i[0] == j[0] + 1 or i[0] + 1 == j[0] or i[0] == j[0] or i[0] == j[0] + 2 or i[0] + 2 == j[0] or i[0] == j[0] + 3 or i[0] + 3 == j[0]:
          if i[1] == j[1] + 1 or i[1] + 1 == j[1] or i[1] == j[1] or i[1] == j[1] + 2 or i[1] + 2 == j[1] or i[1] == j[1] + 3 or i[1] + 3 == j[1]:
            count = count + 1
            lis[k] = lis[k] + [j]
    k = k + 1
    # #print(i,count)
  for i in range(0, k):
    for j in range(0, k):
      if i != j:
        if (all(x in lis[i] for x in lis[j])):
          lis[i] = ['o']
  li = {}
  j = 0

  for i in range(0, k):
    if len(lis[i]) != 1:
      li[j] = lis[i]
      j = j + 1
  # print(li)
  sm = []
  lg = []
  for i in range(0, j):
    smi = 100
    smj = 100
    lgi = 0
    lgj = 0
    for k in li[i]:
      for kk in li[i]:
        if k != kk:
          if k[0] <= kk[0] and k[0] < smi:
            smi = k[0]
          if k[1] <= kk[1] and k[1] < smj:
            smj = k[1]
          if k[0] >= kk[0] and k[0] > lgi:
            lgi = k[0]
          if k[1] >= kk[1] and k[1] > lgj:
            lgj = k[1]
    sm = sm + [[smi, smj]]
    lg = lg + [[lgi, lgj]]


##################################################################

  diction.update(
      {8: [sm, lg, count1]})

  return diction


if __name__ == '__main__':
  api.run()
