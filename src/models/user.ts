
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { User } from "../types/user";

export const create = (user: User, callback: Function) => {
    const queryString = "INSERT INTO User (userName, email, password) VALUES (?, ?, ?)"
  
    db.query(
      queryString,
      [user.userName, user.email, user.password],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findUser = (userID: number, callback: Function) => {

    const queryString = `
      SELECT * FROM User WHERE userID=?`
      
    db.query(queryString, userID, (err, result) => {
      if (err) {callback(err)}
      
      const row = (<RowDataPacket> result)[0];
      const user: User =  {
        userID: row.userID,
        userName: row.userName,
        email: row.email
      }
      callback(null, user);
    });
};

