import axios from "axios";
import { db } from "../../DB/init";

export const login = {
  init: async function(req, res) {
    const REDIRECT_URI = "http://localhost:3000/user/login";
    const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
    const KAKAO_GRANT_TYPE = "authorization_code";
    const REST_API_KEY = "48d8cb78dea948d30fa7d494009ab18a";
    let code = req.query.code;
    let token;
    try {
      await axios({
        method: "GET",
        url: `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,

        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      })
        .then(result => {
          token = result.data["access_token"];
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      res.send(e);
    }

    let user;
    try {
      await axios({
        method: "get",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(result => {
        const data = result.data;
        const { id } = data;
        const sql = `SELECT * FROM user WHERE id = ${id}`;
        db.query(sql, function(err, results) {
          if (results.length > 0) {
            console.log("이미 존재하는 사용자 입니다.");
          } else {
            login.register(data);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  },
  register: function(user) {
    const { id } = user;
    const { nickname } = user.properties;
    const sql = `INSERT INTO user (id, nickname,school1,school2,school3) VALUES ('${id}', '${nickname}', '혜화초', '혜화중', '혜화고')`;
    db.query(sql, function(err, results) {
      if (err) {
        throw err;
      }
    });
  }
};
