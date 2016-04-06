#!/bin/bash

# Script to setup the software.

# Step 1. Get the database username/password

# echo Enter database user (tsdms)
read -p "Enter user (tsdms): " user
if [ "$user" == "" ] ; then user="tsdms" ; fi

confirmPassword="*"
while [ "$password" != "$confirmPassword" ]; do
  read -s -p "Enter password: " password
  echo
  read -s -p "Confirm password: " confirmPassword
  echo
  if [ "$password" != "$confirmPassword" ] ; then echo "Passwords did not match" ; fi
done

printf "// Automatically Generated config file \n\nmodule.exports = {\n  username: '$user', \n  password: '$password' \n}\n" > config.js
