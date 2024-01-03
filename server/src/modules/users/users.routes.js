const express = require('express');

const {
  login,
  logout,
  verifyAccount,
  getUsers,
  getUser,
  getMe,
  updateUser,
  createUser,
  updateSelf,
  updatePassword,
  downloadUsers,
} = require('./users.controllers');
const requireUserAuth = require('../../middleware/requireUserAuth');
const permission = require('../../middleware/permission');
const router = express.Router();

//TODO: Remember to add auth required and permissions to create user

//AUTH
router.post(
  '/auth/create-user',
  //   requireUserAuth,
  //   permission('Super Admin', 'Admin'),
  createUser,
); //api/v1/auth/signup
router.post('/auth/login', login); //api/v1/auth/login
router.get('/auth/logout', logout); //api/v1/logout
router.post('/auth/verify', verifyAccount); //api/v1/auth/verify

//USER
router.get(
  '/users',
  requireUserAuth,
  permission('Super Admin', 'Admin'),
  getUsers,
); //api/v1/users
router.get('/users/me', requireUserAuth, getMe); //api/v1/users/me
router.get(
  '/users/:slug',
  requireUserAuth,
  permission('Super Admin', 'Admin'),
  getUser,
); //api/v1/users/:slug
router.put(
  '/users/:slug',
  requireUserAuth,
  permission('Super Admin', 'Admin'),
  updateUser,
); //api/v1/users/:slug
router.put('/users/update/profile', requireUserAuth, updateSelf); //api/v1/users/update-profile
router.put('/users/update/password', requireUserAuth, updatePassword); //api/v1/users/update-profile
router.get(
  '/users/download/excel',
  requireUserAuth,
  permission('Super Admin', 'Admin'),
  downloadUsers,
); //api/v1/users/update-profile

module.exports = router;
