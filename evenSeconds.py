import requests
import json

def adiciona_tag(id, tag):
    url = 'https://us20.api.mailchimp.com/3.0/lists/19dc19554a/members/' + id + '/tags'
    tags = {'tags': [{'name':tag,'status':'active'}]}
    print(tags)
    r3 = requests.post(url, headers = headers, json=tags)
    print(r3)

headers = {'Authorization': 'auth 51a05dbe5432372ab4c540775ce8d637-us20'}

r = requests.get('https://us20.api.mailchimp.com/3.0/lists/19dc19554a/members', headers = headers)
r_json = r.json()

# encontra pares
for member in r_json['members']:
    print(member['timestamp_opt'][10:19] + '\t' + member['email_address'])
    if(int(member['timestamp_opt'][17:19]) % 2 == 0):
        print('Eh par')
        adiciona_tag(member['id'], 'PAR')

# cria tag
# url2 = 'https://us20.api.mailchimp.com/3.0/lists/19dc19554a/segments'
# tag = {'name':'Testetag', 'Static_segment': []}
# r2 = requests.post(url2, json=tag, headers=headers)
# print(r2)




# outfile = open('C:/Users/jgian/Desktop/output.json', 'w')
# print (type(json['members']))
