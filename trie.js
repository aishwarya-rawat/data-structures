
function TrieNode() {
    this.children = new Map();
    this.end = false;
    this.setEnd = function () {
        this.end = true;
    }
    this.isEnd = function () {
        return this.end;
    }
}


function Trie() {
    this.root = new TrieNode();

    //add -> return void
    this.add = function (word, node = this.root) {
        if (word.length === 0) {
            node.setEnd()
            return;
        }
        //check if node contains word[0]
        if (node.children.has(word[0])) {
            return this.add(word.substring(1), node.children.get(word[0]));
        } else {
            node.children.set(word[0], new TrieNode());
            return this.add(word.substring(1), node.children.get(word[0]));
        }
    }


    //search -> returns boolean
    this.isPresent = function (searchTerm) {
        let node = this.root;
        while (searchTerm.length > 1) {
            if (node.children.has(searchTerm[0])) {
                node = node.children.get(searchTerm[0])
                searchTerm = searchTerm.substring(1);
            } else {
                return false
            }
        }
        //after while loop, search term will be only 1 character here
        return node.children.has(searchTerm) && node.children.get(searchTerm).isEnd() ? true : false;
    }

    //print
    this.print = function () {
        let output = [];

        function rec(node, str) {
            if (node.isEnd()) {
                output.push(str);
                return;
            }
            node.children.forEach((val, key) => {
                rec(val, str + key);
            })
        }

        rec(this.root, '');
        return output;

    }

}


let myTrie = new Trie();
//to add values to the trie

myTrie.add('bat');
myTrie.add('ball');
myTrie.add('batman');
myTrie.add('cat');
myTrie.add('car');
myTrie.add('cot');
myTrie.add('dog');
myTrie.add('data');

//to search for a value in the trie
console.log(myTrie.isPresent('bat')); //true
console.log(myTrie.isPresent('sand')); //false
console.log(myTrie.isPresent('balls')); //false

//print all values in Trie
console.log(myTrie.print());
