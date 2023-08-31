const { client } = require('../connect');
const router = require('express').Router();

router.post("/addApartments", async (req, res) => {
    try {

        // smazani vsech zaznamu z db
        const deleteQuery = `DELETE FROM apartment_data`;

        client.query(deleteQuery, (err, result) => {
            if (err) {
                console.error('Error deleting rows:', err);
                return;
            }
            console.log(`All rows deleted from apartment_data`);
        });

        const apartments = req.body.apartments;
        // const apartments = [
        //     {
        //         title: 'John Doe',
        //         imageUrl: 'john@example.com',
        //     },
        //     {
        //         title: 'asdf Smith',
        //         imageUrl: 'jandfgdfge@example.com',
        //     },
        // ];
        console.log(apartments)
        apartments.forEach(jsonData => {
            console.log(jsonData)
            client.query(`INSERT INTO apartment_data(title, image_url) VALUES('${jsonData.title}', '${jsonData.imageUrl}')`, (err, result) => {
                if (err) {
                    console.error('Error inserting JSON data:', err);
                    return;
                }
                console.log('JSON data inserted successfully');
            });
        });
        res.status(200).send("easy");
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/getAllApartments", async (req, res) => {
    try {
        client.query(`SELECT * FROM apartment_data`, (err, result) => {
            const modifiedData = result.rows.map(item => {
                return {
                    title: item.title,
                    imageUrl: item.image_url, // Change the key name
                };
            });
            res.status(200).json(modifiedData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;