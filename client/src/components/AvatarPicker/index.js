import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Input } from 'antd'

const normalizeValue = (value) => value && (window.URL || window.webkitURL).createObjectURL(value)

const AvatarPicker = ({ value, onChange }) => {
  console.log('value: ', value);
  const onAvatarChange = (e) => onChange(e.target.files[0])

  return (
    <React.Fragment>
      <Avatar icon="user" src={normalizeValue(value)} />
      <div className="ant-input file">
        Choose avatar
        <Input className="file-input" onChange={onAvatarChange} accept="image/jpeg,image/png" type="file" />
      </div>
    </React.Fragment>
  )
}

AvatarPicker.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AvatarPicker
