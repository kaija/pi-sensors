#!/bin/bash
sudo apt-get install -y ansible sshpass
ansible-playbook -i inventory/hosts playbook.yml
# --ask-become-pass
