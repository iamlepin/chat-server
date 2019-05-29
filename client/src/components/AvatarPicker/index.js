import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Input, Modal, Slider } from 'antd'
import AvatarEditor from 'react-avatar-editor'


class AvatarPicker extends React.Component {
  state = {
    avatarUrl: null,
    isModalVisible: false,
    scale: 1,
    rotate: 0,
  }

  normalizeValue = (value) => value && (window.URL || window.webkitURL).createObjectURL(value)

  onAvatarChange = (e) => {
    this.setState({
      avatarUrl: this.normalizeValue(e.target.files[0]),
      isModalVisible: true,
    })
  }

  onResizeConfirm = () => {
    if (this.editorRef) {
      const canvasScaled = this.editorRef.current.getImageScaledToCanvas()
      canvasScaled.toBlob((blob) => {
        this.props.onChange(blob)
        this.setState({ isModalVisible: false })
      })
    }
  }

  onCancel = () => this.setState({ isModalVisible: false })

  onScale = (value) => this.setState({ scale: value })

  onRotate = (value) => this.setState({ rotate: value })

  editorRef = React.createRef()

  render () {
    const { value, onChange } = this.props
    return (
      <React.Fragment>
        <Avatar icon="user" src={this.normalizeValue(value)} />
        <div className="ant-input file">
          {(value && value.name) || 'Choose avatar'}
          <Input className="file-input" onChange={this.onAvatarChange} accept="image/jpeg,image/png" type="file" />
        </div>
        <Modal
          title="Resize your avatar"
          visible={this.state.isModalVisible}
          onOk={this.onResizeConfirm}
          onCancel={this.onCancel}
        >
          <AvatarEditor
            ref={this.editorRef}
            image={this.state.avatarUrl}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={this.state.scale}
            rotate={this.state.rotate}
          />
          <div>
            Scale:
            <Slider onChange={this.onScale} defaultValue={1} min={1} max={10} step={0.025} />
            Rotate:
            <Slider onChange={this.onRotate} defaultValue={0} min={0} max={360} step={1} />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

AvatarPicker.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AvatarPicker
