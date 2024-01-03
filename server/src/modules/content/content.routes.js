const express = require("express");
const requireUserAuth = require("../../middleware/requireUserAuth");
const permission = require("../../middleware/permission");
const { createContents, getMyContents, getContents, getContent, updateMyContent, ApproveContent, getMyContent } = require("./content.controllers");
const router = express.Router()


router.post("/", requireUserAuth, createContents); //api/v1/contents
router.get("/mine/all", requireUserAuth, getMyContents); //api/v1/contents/mine
router.get("/mine/all/:slug", requireUserAuth, getMyContent); //api/v1/contents/mine/:slug
router.get("/", requireUserAuth, permission("Super Admin", "Admin"), getContents); //api/v1/contents
router.get("/:slug", requireUserAuth, permission("Super Admin", "Admin"), getContent); //api/v1/contents/mine/:slug
router.put("/mine/:slug", requireUserAuth, updateMyContent); //api/v1/contents/:slug
router.put("/:slug", requireUserAuth, permission("Super Admin", "Admin"), ApproveContent); //api/v1/contents/:slug


module.exports = router