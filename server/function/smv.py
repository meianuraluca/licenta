import pandas as pd
import numpy as np
import nltk as nltk
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import model_selection, naive_bayes, svm
from sklearn.metrics import accuracy_score

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')



np.random.seed(500)

corpus = pd.read_csv(r"E:\FMI\Anul III\Licenta\chesti\DateNoi.csv",encoding ="latin-1")

corpus['text'].dropna(inplace=True)

corpus['text'] = [entry.lower() for entry in corpus['text']]

corpus['text'] = [word_tokenize(entry) for entry in corpus['text']]

tag_map = defaultdict(lambda : wn.NOUN)
tag_map['J'] = wn.ADJ
tag_map['V'] = wn.VERB
tag_map['R'] = wn.ADV

stopwords = ["o","acea","aceasta","această","aceea","acei","aceia","acel","acela","acele","acelea","acest","acesta","aceste","acestea","aceşti","aceştia","acolo","acord","acum","ai","aia","aibă","aici","al","ăla","ale","alea","ălea","altceva","altcineva","am","ar","are","aş","aşadar","asemenea","asta","ăsta","astăzi","astea","ăstea","ăştia","asupra","aţi","au","avea","avem","aveţi","azi","bine","bucur","bună","ca","că","căci","când","care","cărei","căror","cărui","cât","câte","câţi","către","câtva","caut","ce","cel","ceva","chiar","cinci","cînd","cine","cineva","cît","cîte","cîţi","cîtva","contra","cu","cum","cumva","curând","curînd","da","dă","dacă","dar","dată","datorită","dau","de","deci","deja","deoarece","departe","deşi","din","dinaintea","dintr-","dintre","doi","doilea","două","drept","după","ea","ei","el","ele","eram","este","eşti","eu","face","fără","fata","fi","fie","fiecare","fii","fim","fiţi","fiu","frumos","graţie","halbă","iar","ieri","îi","îl","îmi","împotriva","în","înainte","înaintea","încât","încît","încotro","între","întrucât","întrucît","îţi","la","lângă","le","li","lîngă","lor","lui","mă","mai","mâine","mea","mei","mele","mereu","meu","mi","mie","mîine","mine","mult","multă","mulţi","mulţumesc","ne","nevoie","nicăieri","nici","nimeni","nimeri","nimic","nişte","noastră","noastre","noi","noroc","noştri","nostru","nouă","nu","opt","ori","oricând","oricare","oricât","orice","oricînd","oricine","oricît","oricum","oriunde","până","patra","patru","patrulea","pe","pentru","peste","pic","pînă","poate","pot","prea","prima","primul","prin","puţin","puţina","puţină","rog","sa","să","săi","sale","şapte","şase","sau","său","se","şi","si","multe","sînt","sîntem","sînteţi","spate","spre","ştiu","sub","sunt","suntem","sunteţi","sută","ta","tăi","tale","tău","te","ţi","ţie","timp","tine","toată","toate","tot","toţi","totuşi","trei","treia","treilea","tu","un","una","unde","undeva","unei","uneia","unele","uneori","unii","unor","unora","unu","unui","unuia","unul","vă","vi","voastră","voastre","voi","voştri","vostru","vouă","vreme","vreo","vreun","zece","zero","zi","zice"]
    

for index,entry in enumerate(corpus['text']):
    final_words = []
    word_lemmatized = WordNetLemmatizer()
    for word,tag in pos_tag(entry):
        if word not in stopwords and word.isalpha():
            word_final = word_lemmatized.lemmatize(word,tag_map[tag[0]])
            final_words.append(word_final)
            corpus.loc[index,'text_final'] = str(final_words)

train_x, train_y = corpus['text_final'],corpus['label']

Encoder = LabelEncoder()
train_y = Encoder.fit_transform(train_y)


tfidf_vect = TfidfVectorizer(max_features=5000)
tfidf_vect.fit(corpus['text_final'])
train_x_tfidf = tfidf_vect.transform(train_x)

naive = naive_bayes.MultinomialNB()
naive.fit(train_x_tfidf,train_y)

#testarea 


# testData = pd.read_csv(r"E:\FMI\Anul III\Licenta\chesti\acum.csv",encoding ="latin-1")
# testData['text'].dropna(inplace=True)
# print(testData['text'])
# testData['text'] = [entry.lower() for entry in testData['text']]
# testData['text'] = [word_tokenize(entry) for entry in testData['text']]



# for index,entry in enumerate(testData['text']):   
#     final_words_nou = []
#     word_lemmatized_nou = WordNetLemmatizer()
#     for word,tag in pos_tag(entry):
#         if word not in stopwords and word.isalpha():
#             word_final_nou = word_lemmatized_nou.lemmatize(word,tag_map[tag[0]])
#             final_words_nou.append(word_final_nou)
#             testData.loc[index,'text_final'] = str(final_words_nou)

# text_x_nou = testData['text_final']
# print(text_x_nou)

# tfidf_vect_nou = TfidfVectorizer(max_features=5000)
# print(tfidf_vect_nou)
# tfidf_vect_nou.fit(testData['text_final'])
# print(tfidf_vect_nou)
# test_x_tfidf_nou = tfidf_vect.transform(text_x_nou)
# print(test_x_tfidf_nou)

# print(naive.predict(test_x_tfidf_nou))




# testData = "Imi doresc sa donez o casuta de papusi pe care eu am iubit o super mult cand eram mica dar acum am crescut si as vrea sa faca fericta o alta fetita."
#testData = "Am de vanzare un cuptor"

def predictCategory(testData):
    testData =testData.lower()
    print(testData)
    testData= word_tokenize(testData)
    final_words_nou = []
    word_lemmatized_nou = WordNetLemmatizer()
    for word,tag in pos_tag(testData):
        if word not in stopwords and word.isalpha():
                word_final_nou = word_lemmatized_nou.lemmatize(word,tag_map[tag[0]])
                final_words_nou.append(word_final_nou)
                testData = str(final_words_nou)

    text_x_nou = testData
    tfidf_vect_nou = TfidfVectorizer(max_features=5000)
    tfidf_vect_nou.fit([testData])
    test_x_tfidf_nou = tfidf_vect.transform([text_x_nou])
    y_predicted = naive.predict(test_x_tfidf_nou)
    return y_predicted