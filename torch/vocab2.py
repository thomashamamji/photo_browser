from torchtext import vocab

examples = ['chip', 'baby', 'Beautiful']
vec = vocab.GloVe(name='6B', dim=50)
ret = vec.get_vecs_by_tokens(tokens, lower_case_backup=True)