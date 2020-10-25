//https://www.digitalocean.com/community/tutorials/react-tabs-component#conclusion

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);
    // For if refresh was called after submitting information to the database
    const tab = sessionStorage.getItem("activeTab");
    
    if(tab === null) {
      this.state = {
        activeTab: this.props.children[0].props.label,
      };
    } else {
      this.state = {
        activeTab: tab
      };
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }
  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;
            sessionStorage.removeItem("activeTab");
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;