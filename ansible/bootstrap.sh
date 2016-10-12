#!/bin/bash
ansible-playbook -i inventory/hosts playbook.yml --ask-become-pass
