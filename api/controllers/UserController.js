"use strict";
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var React = require('react');
var renderToString = require('react-dom/server').renderToString;
var ReactRouter = require('react-router');
var match = ReactRouter.match;
var RouterContext = ReactRouter.RouterContext;
var router = require('wscada-ui/router');
var routes = router.routes;
var Application = router.Application;

module.exports = {
	home: function(req, res, next) {
		match( { routes, location: req.url }, (error, redirectLocation, renderProps) => {
			if (error) {
				res.serverError();
			} else if (redirectLocation) {
				res.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				// User must be logged in to open any page
				if (!req.session.me) {
					return res.view('auth/login', {
						successRedirect: req.url
					});
				}
				User.findOne({
					id: req.session.me
				}).exec(function(err, user) {
					if (err) {
						return res.negotiate(err);
					}
					if (!user) {
						return res.view('auth/login', {
							successRedirect: req.url
						});
					}

					res.view('react', {
						user: user.toJSON(),
						data: { },
						html: renderToString(
							React.createElement(Application, {user: user},
								React.createElement(RouterContext, renderProps)
							)
						)
					});
				});
			} else {
				console.log("Forward request from react-router - ", req.url);
				next();
			}
		});
	},

	login: function(req, res) {
		var returnUrl = req.header('referer');
		if (!returnUrl ||  returnUrl.endsWith('/login')) {
			returnUrl = '/';
		}
		return res.login({
			username: req.param('username'),
			password: req.param('password'),
			successRedirect: returnUrl,
		});
	},

	logout: function(req, res) {
		// Clear out the session
		req.session.me = null;

		// For ajax based logouts, just send a message
		if (req.wantsJSON) {
			return res.ok("Logged out successfully");
		}

		// For browser based logouts, redirect to the home page
		return res.redirect('/');
	},


};
