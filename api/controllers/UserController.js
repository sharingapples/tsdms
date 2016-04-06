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
var SailsApp = require('react-sails');
var RouterApp = require('../../react/server.generated').default;
//console.log("Routes: ", App.routes);
const routes = RouterApp.routes;

module.exports = {
	home: function(req, res, next) {
		console.log("UserController::home");
		match( { routes, location: req.url }, (error, redirectLocation, renderProps) => {
			if (error) {
				res.serverError();
			} else if (redirectLocation) {
				res.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				//console.log(renderProps);

				console.log("Render App. USER -> ", req.session.me);
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

					var start = Date.now();

					const renderApp = function(app) {

						res.view('react', {
							user: user.toJSON(),
							data: {}, // This is where the app parameter could be used
							html: renderToString(
								React.createElement(RouterContext, renderProps)
							)
						});
					}


					// The first time render is what invokes all the data required
					res.view('react', {
						user: user.toJSON(),
						data: {},
						html: renderToString(
										React.createElement(RouterApp, Object.assign({user: user, initialData: {}}, renderProps))
									)
					});
				});
			} else {
				console.log("Forward request from react-router - ", req.url, req.session.me);
				next();
			}
		});
	},

	login: function(req, res) {
		var returnUrl = req.header('referer');
		if (!returnUrl ||  returnUrl.endsWith('/login')) {
			returnUrl = '/app/';
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
