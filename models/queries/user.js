exports.add = ({ name, email, password }) => ({
  text: `
    INSERT INTO chat.app_user (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
  values: [ name, email, password ]
})

exports.getBy = (field, value) => ({
  text: `
    SELECT ${field} FROM chat.app_user
    WHERE ${field}=$1;
  `,
  values: [ value ]
})

exports.checkBy = (whereClauseString) => ({
  text: `
    SELECT * FROM chat.app_user
    WHERE ${whereClauseString};
  `,
  values: []
})
