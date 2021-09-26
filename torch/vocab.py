import io
from torchtext.vocab import build_vocab_from_iterator
from torchtext.vocab import build_vocab_from_iterator
def yield_tokens(file_path):
    with io.open(file_path, encoding = 'utf-8') as f:
        for line in f:
            yield line.strip().split()
vocab = build_vocab_from_iterator(yield_tokens("vocab.txt"))
print(vocab())