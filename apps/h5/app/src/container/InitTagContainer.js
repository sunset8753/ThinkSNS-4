import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from 'amazeui-touch';
import { TagActionAsync, setTagList, createSelectTagAction, ADD_SELETE_TAG, DELETE_SELETE_TAG } from '../action/InitTagAction.js';
import modalAction, { closeModal } from '../action/ModalAction.js';
import InitTagComponent from '../component/init/TagComponent.js';
import InitTagFetch from '../fetch/InitTagFetch.js';
import SetUserTagFetch from '../fetch/setUserTagFetch.js';
import { durationSendNotification } from '../util/notification.js';
import { setTransitionType, SHOW_FROM_RIGHT } from '../util/transitionType.js';

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => (bindActionCreators({TagActionAsync}, dispatch));

class InitTagContainer extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    TagActionAsync: PropTypes.func.isRequired,
  };

  render() {
    const { store } = this.context;
    const state = store.getState();

    if (state === false) {
      return null;
    }

    const handleSeleteTag = this.handleSeleteTag.bind(this);
    const handleSubmitTags = this.handleSubmitTags.bind(this);

    return (
      <InitTagComponent
        tags={state.list}
        selected={state.selected}
        handleSeleteTag={handleSeleteTag}
        handleSubmitTags={handleSubmitTags}
      />
    );
  }

  componentDidMount() {
    const { store } = this.context;
    const state = store.getState();

    if (state === false) {
      const { TagActionAsync } = this.props;
      InitTagFetch((error, response) => {
        if (error !== null) {
          let statusText = response ? response.statusText : '网络连接失败';
          durationSendNotification(statusText);
        } else {
          TagActionAsync(setTagList(response.body));
        }
      });
    }
  }

  handleSeleteTag({id, name}) {
    const { store } = this.context;
    const { selected } = store.getState();
    const { TagActionAsync } = this.props;
    let { length } = Object.keys(selected);

    if (selected[id]) {
      TagActionAsync(createSelectTagAction(DELETE_SELETE_TAG, id));
    } else if (length >= 5) {
      modalAction({
        role: 'alert',
        closeBtn: true,
        node: '标签选择数量最多只能5个'
      });
    } else {
      TagActionAsync(createSelectTagAction(ADD_SELETE_TAG, id, name));
    }
  }

  handleSubmitTags() {
    const { store, router } = this.context;
    const { selected } = store.getState();
    let { length } = Object.keys(selected);
    setTransitionType(SHOW_FROM_RIGHT);

    if (length <= 0) {
      router.push('/init/follow');
      return ;
    }

    let arr = [];
    for (let key in selected) {
      arr.push(selected[key]);
    }

    modalAction({
      title: '设置标签中...',
      closeBtn: false,
      node: (<Loader amStyle="success" rounded={true} />)
    });

    const name = arr.toString();
    SetUserTagFetch(name, (error, response) => {
      if (error !== null) {
        setTimeout(closeModal, 1500);
        let statusText = response ? response.statusText : '网络连接失败';
        durationSendNotification(statusText);
      } else if (response.body.status != 1) {
        setTimeout(closeModal, 1500);
        durationSendNotification(response.body.info);
      } else {
        durationSendNotification('设置标签成功');

        setTimeout(() => {
          closeModal();
          router.push('/init/follow');
        }, 1500);
      }
    });
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(InitTagContainer);