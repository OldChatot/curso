#!/usr/bin/python

from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer

class CORSRequestHandler (SimpleHTTPRequestHandler):
	def end_headers (self):
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Allow', 'GET,POST,OPTIONS')
		SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
	BaseHTTPServer.test(CORSRequestHandler,BaseHTTPServer.HTTPServer)
