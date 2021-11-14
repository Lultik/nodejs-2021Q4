# Ciphering CLI Tool

## To start

1. Install Node.js
2. Fork [this](https://github.com/Lultik/nodejs-2021Q4) repository
3. Clone your newly created repo: ```git clone https://github.com/<%your_github_username%>/nodejs-2021Q4/```
4. Go to branch develop: ```git checkout develop```
5. Go to folder chipering-cli-tool: ```cd ./chipering-cli-tool```

### CLI tool accept 3 options (short alias and full name):

1. -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
2. -i, --input: a path to input file
3. -o, --output: a path to output file

You can use aliases from package.json to execute usages examples from school's repo:

> ```npm run first``` will execute "node my_ciphering_cli -c C1-C1-R0-A -i ./shortInput.txt -o ./output.txt"

> ```npm run second``` will execute "node my_ciphering_cli -c C1-C0-A-R1-R0-A-R0-R0-C1-A -i ./shortInput.txt -o ./output.txt",

> ```npm run third``` will execute "node my_ciphering_cli -c A-A-A-R1-R0-R0-R0-C1-C1-A -i ./input.txt -o ./output.txt",

> ```npm run fourth``` will execute "node my_ciphering_cli -c C1-R1-C0-C0-A-R0-R1-R1-A-C1 -i ./input.txt -o ./output.txt"
 
