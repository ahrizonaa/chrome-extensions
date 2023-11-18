import os
import re
# Get the current directory
current_directory = os.getcwd()
print(current_directory)
# Iterate over the files
for root,dirs,files in os.walk(current_directory):
    for file in files:
      curr = os.path.join(root, file)
      with open(curr, 'w+') as fp:
         lines = fp.readlines()
         for line in lines:
            line = re.sub(r'\.component', '')
            line = re.sub(r'Component')
