import cv2
import math
import numpy as np
import numpy as np
import matplotlib.pyplot as plt
import skimage
from skimage import data, img_as_float
from skimage.metrics import structural_similarity as ssim
from sklearn.metrics import mean_squared_error
import pickle
####
#    I(x) = J(x)*t(x) + A(1-t(x))

import time
start_time = time.time()

def DarkChannel(im,sz):
    b,g,r = cv2.split(im)
    dc = cv2.min(cv2.min(r,g),b)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(sz,sz))
    dark = cv2.erode(dc,kernel)
    return dark

def AtmLight(img,dark):
    [h,w,_] = np.shape(img)
    imsz = h*w
    numpx = int(max(math.floor(imsz/1000),1))
    darkvec = np.reshape(dark,(imsz,1))
    imvec = np.reshape(img,(imsz,3))

    indi = darkvec.argsort()
    indi = indi[imsz-numpx::]

    atmsum = np.zeros([1,3])
    for ind in range(1,numpx):
       atmsum = atmsum + imvec[indi[ind]]

    A = atmsum / numpx
    print('A',A)
    return A

def TransmissionEstimate(im,A,sz):
    omega = 0.95
    im3 = np.empty(im.shape,im.dtype)

    for ind in range(0,3):
        im3[:,:,ind] = im[:,:,ind]/A[0,ind]

    transmission = 1 - omega*DarkChannel(im3,sz)
    return transmission

def Guidedfilter(im,p,r,eps):
    mean_I = cv2.boxFilter(im,cv2.CV_64F,(r,r))
    mean_p = cv2.boxFilter(p, cv2.CV_64F,(r,r))
    mean_Ip = cv2.boxFilter(im*p,cv2.CV_64F,(r,r))
    cov_Ip = mean_Ip - mean_I*mean_p

    mean_II = cv2.boxFilter(im*im,cv2.CV_64F,(r,r))
    var_I   = mean_II - mean_I*mean_I

    a = cov_Ip/(var_I + eps)
    b = mean_p - a*mean_I

    mean_a = cv2.boxFilter(a,cv2.CV_64F,(r,r))
    mean_b = cv2.boxFilter(b,cv2.CV_64F,(r,r))

    q = mean_a*im + mean_b
    return q

def TransmissionRefine(im,et):
    gray = cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    gray = np.float64(gray)/255
    r = 60# radius of filter
    eps = 0.001# regularization parameter
    t = Guidedfilter(gray,et,r,eps)
    return t

def Recover(im,t,A,tx = 0.1):
    res = np.empty(im.shape,im.dtype)
    t = cv2.max(t,tx)

    for ind in range(0,3):
        res[:,:,ind] = (im[:,:,ind]-A[0,ind])/t + A[0,ind]

    return res

# cv2.setUseOptimized(True)
# cv2.setUseOptimized(cv2.ocl.haveOpenCL())
cap = cv2.VideoCapture("C:/Users/Yuvaraaj/Downloads/Dehazing_image_and_video/video.mp4")
c = cv2.imread('image.png')
while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    scale_percent = 50  # Adjust the scale percentage as needed
    width = int(frame.shape[1] * scale_percent / 100)
    height = int(frame.shape[0] * scale_percent / 100)
    rframe = cv2.resize(frame, (width, height))
    print(ret)
    I = rframe.astype('float64')/255

    dark = DarkChannel(I,15)
    A = AtmLight(I,dark)
    te = TransmissionEstimate(I,A,15)
    t = TransmissionRefine(rframe ,te)
    J = Recover(I,t,A,0.1)

    # Display the resulting frame
    cv2.imshow('Original Hazy',rframe)
    cv2.imshow('Haze removed',J)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break




# I=np.fromfile(file='1.png',dtype='float32')
# frame= c
# I=frame.astype('float64')/255
# dark = DarkChannel(I,15)
# A = AtmLight(I,dark)
# te = TransmissionEstimate(I,A,15)
# t = TransmissionRefine(frame ,te)
# J = Recover(I,t,A,0.1)

# with open('1_new.png','wb+') as f:
#     cv2.imwrite('1_new.png',J)
# print('yes')
# cv2.imshow('Original Hazy',frame)
# cv2.imshow('Haze removed',J)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
