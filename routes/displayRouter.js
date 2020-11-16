const express = require('express');
const Album = require('../models/album');
const multer = require('multer');
const upload = multer();
const cut = require('../utilities/cut');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/id/:_id', async (req, res, next) => {
    try {
        let { _id } = req.params;

        if (!_id) {
            let err = new Error('Id must be present');
            err.status = 400;
            next(err);
            return;
        }

		_id = _id.toString();
		
        let data = await Album.findById(mongoose.Types.ObjectId(_id));
        if (!data) {
            let err = new Error('Invalid id');
            err.status = 404;
            next(err);
            return;
        }

        res.status(200).json({ ok: 1, data });
    } catch (err) {
        next(err);
    }
});

router.get('/:fest', async (req, res, next) => {
    try {
        let searchOptions = {};

        let { fest } = req.params;
        const list = ['waves', 'quark', 'spree', 'other'];

        if (!list.includes(fest)) {
            next();
            return;
        }
        searchOptions.fest = fest;

        let { year } = req.query;
        if (year) {
            searchOptions.year = parseInt(year);
        }

        let data = await Album.find(searchOptions);
        data = data.map((entry) =>
            cut(entry, ['fest', 'year', 'name', 'theme', 'images', '_id'])
        );
        if (!year) {
            data = data.map((entry) => {
                return {
                    id: entry._id,
                    fest: entry.fest,
                    year: entry.year,
                    name: entry.name,
                    theme: entry.theme,
                    coverImage: entry.images[0],
                    _id: entry._id,
                };
            });
            function yearSort(a, b) {
                return b.year - a.year;
            }
            data.sort(yearSort);
        }

        res.status(200).json({ ok: 1, data });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
