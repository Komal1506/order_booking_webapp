const express = require("express");
const app = express();
const notifier = require("node-notifier");
console.log("index file running ");
const bodyparser = require("body-parser");
const con = require("./connection");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

// const con = require("./aaaa_con");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Main.html");
});

app.post("/", (req, res) => {
  console.log("hiiii");
  const icode = req.body.itemCode;
  const iname = req.body.itemName;
  const barcode = req.body.barcode;
  const hsncode = req.body.hsnCode;
  const quantity = req.body.quantity;
  const deptname = req.body.deptName;
  const subdname = req.body.subDeptName;
  const hsngcode = req.body.hsnGroupCode;
  const pcase = req.body.packagingCase === "on" ? "on" : "off";
  const trading = req.body.trading === "on" ? "on" : "off";
  const consu = req.body.consumable === "on" ? "on" : "off";
  const pacunit = req.body.pacunit;
  const looseunit = req.body.looseunit;
  const convfactor = req.body.convfactor;
  const cratesltr = req.body.cratesltr;
  const rate1 = req.body.rate1;
  const rate2 = req.body.rate2;
  const rate3 = req.body.rate3;
  const tax = req.body.tax;
  const taxontax = req.body.taxontax;
  const addtax = req.body.addtax;
  const sales = req.body.salesGroup;
  const purchase = req.body.purchaseGroup;
  const reorder = req.body.reorder;
  const opstock = req.body.opstock;
  const maxrate = req.body.maxrate;
  const recorder = req.body.recorder;
  const loosestock = req.body.loosestock;
  const oprate = req.body.oprate;
  const opamount = req.body.opamount;
  console.log("connect succssfully");
  con.connect((error) => {
    if (error) {
      console.log(error);
    }
    var sql =
      "insert into item (item_code,item_name,barcode,hsncode,quantity,deptname,subdeptname,hsngcode,pcase,trading,consu,pacunit,looseunit,convfactor,cratesltr,rate1,rate2,rate3,Tax,taxontax,addtax,sales,purchase,reorder,opstock,maxrate,recorder,loosestock,oprate,opamount) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    con.query(
      sql,
      [
        icode,
        iname,
        barcode,
        hsncode,
        quantity,
        deptname,
        subdname,
        hsngcode,
        pcase,
        trading,
        consu,
        pacunit,
        looseunit,
        convfactor,
        cratesltr,
        rate1,
        rate2,
        rate3,
        tax,
        taxontax,
        addtax,
        sales,
        purchase,
        reorder,
        opstock,
        maxrate,
        recorder,
        loosestock,
        oprate,
        opamount,
      ],
      (error, resp) => {
        console.log("hello");
        if (error) {
          console.log("error");
          console.log(error);
        }

        // res.end("Registered Successfully  ");
        res.redirect("/items");
      }
    );
  });
});
// ...

// app.get("/items", (req, res) => {
//   con.connect((error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       var sq = "select * from item";
//       con.query(sq, (error, resp) => {
//         con.release;
//         if (error) {
//           console.log(error);
//         }
//         res.render("items", { items: resp });
//       });
//     }
//   });
// });

// Define a route to handle the search request
app.get("/search", (req, res) => {
  // Get the search value from the query parameters
  const searchValue = req.query.searchValue;
  // Construct the SQL query to search for the item in the database
  const sql = `SELECT * FROM item WHERE item_code ='${searchValue}'`;
  // Execute the SQL query
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.render("read_item.ejs", { result });
    // Send the search results as JSON response
    //res.json(result);
  });
});

app.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/land_page", (req, res) => {
  res.sendFile(__dirname + "/LandPage.html");
});

// app.get("/login_pg", (req, res) => {
//   res.sendFile(__dirname + "/login.html");
// });

app.get("/backtomain", (req, res) => {
  res.sendFile(__dirname + "/Main.html");
});

app.get("/delete_item", (req, res) => {
  con.query("delete from item where id=?", [req.query.id], (err, eachrow) => {
    if (err) {
      console.log(err);
    } else {
      // results = JSON.parse(JSON.stringify(eachrow[0]));
      // console.log(results);
      // res.render("edit.ejs", { results });
      res.end("record deleted successfully");
    }
  });
});
// app.get("/search_p", (req, res) => {
//   // Get the search value from the query parameters
//   const searchp = req.query.searchValue;
//   // Construct the SQL query to search for the item in the database
//   const sql = `SELECT * FROM item WHERE item_code ='${searchp}'`;
//   // Execute the SQL query
//   con.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.render("update_p.ejs", { result });
//     // Send the search results as JSON response
//     //res.json(result);
//   });
// });

//code for updating individual item
app.get("/update-data", (req, res) => {
  con.query(
    "select * from item where item_code=?",
    [req.query.item_code],
    (err, eachrow) => {
      if (err) {
        console.log(err);
      } else {
        // results = JSON.parse(JSON.stringify(eachrow[0]));
        console.log("hiiiii");
        res.render(__dirname + "/update-data", { item: eachrow });
        // res.sendFile(__dirname+"/update-data");
        // res.end("updated successfully");
        // res.render("edit.ejs", { results });
      }
    }
  );
});

app.post("/update-data", (req, res) => {
  const icode = req.body.itemCode;
  const iname = req.body.itemName;
  const barcode = req.body.barcode;
  const hsncode = req.body.hsnCode;
  const quantity = req.body.quantity;
  const deptname = req.body.deptName;
  const subdname = req.body.subDeptName;
  const hsngcode = req.body.hsnGroupCode;
  const pcase = req.body.packagingCase === "on" ? "on" : "off";
  const trading = req.body.trading === "on" ? "on" : "off";
  const consu = req.body.consumable === "on" ? "on" : "off";
  const pacunit = req.body.pacunit;
  const looseunit = req.body.looseunit;
  const convfactor = req.body.convfactor;
  const cratesltr = req.body.cratesltr;
  const rate1 = req.body.rate1;
  const rate2 = req.body.rate2;
  const rate3 = req.body.rate3;
  const tax = req.body.tax;
  const taxontax = req.body.taxontax;
  const addtax = req.body.addtax;
  const sales = req.body.salesGroup;
  const purchase = req.body.purchaseGroup;
  const reorder = req.body.reorder;
  const opstock = req.body.opstock;
  const maxrate = req.body.maxrate;
  const recorder = req.body.recorder;
  const loosestock = req.body.loosestock;
  const oprate = req.body.oprate;
  const opamount = req.body.opamount;
  var id = req.body.id;

  console.log("connect update  succssfully");

  var sql =
    "update item  set item_code=?,item_name=?,barcode=?,hsncode=?,quantity=?,deptname=?,subdeptname=?,hsngcode=?,pcase=?,trading=?,consu=?,pacunit=?,looseunit=?,convfactor=?,cratesltr=?,rate1=?,rate2=?,rate3=?,Tax=?,taxontax=?,addtax=?,sales=?,purchase=?,reorder=?,opstock=?,maxrate=?,recorder=?,loosestock=?,oprate=?,opamount=? where id=?";
  con.query(
    sql,
    [
      icode,
      iname,
      barcode,
      hsncode,
      quantity,
      deptname,
      subdname,
      hsngcode,

      pcase,
      trading,
      consu,
      pacunit,
      looseunit,
      convfactor,
      cratesltr,
      rate1,
      rate2,
      rate3,
      tax,
      taxontax,
      addtax,
      sales,
      purchase,
      reorder,
      opstock,
      maxrate,
      recorder,
      loosestock,
      oprate,
      opamount,
      id,
    ],
    (error, result) => {
      if (error) console.log(error);
      else {
        // else{

        //   notifier.notify({
        //     title: 'Success',
        //     message: 'Data updated successfully!',

        // });
        // res.end(" update successfully");
        // alert("data updated");
        // res.json({ message: "Data updated successfully" });

        res.sendFile(__dirname + "/Main.html");
        // res.redirect("/search");
        // res.render("read_item.ejs", { result });
      }
    }
  );
});

app.post("/groups", (req, res) => {
  const { groupName, groupCode } = req.body;
  const sql = "INSERT INTO groups (groupName, groupCode) VALUES (?, ?)";
  connection.query(sql, [groupName, groupCode], (err, result) => {
    if (err) {
      console.error("Error adding group: ", err);
      res.status(500).send("Error adding group");
      return;
    }
    console.log("Group added successfully");
    res.status(200).send("Group added successfully");
  });
});
app.listen(5000);
