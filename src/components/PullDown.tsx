import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';


interface IState {
  isActive: boolean;
}

type IProps = {
  Trigger: React.ReactNode,
  Items: React.ReactNode[],
}
export default class ButtonMenu extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = { isActive: false};
  }
  toggle = () => {
    this.setState({isActive: !this.state.isActive});
  }
  render = () => {
    const {isActive} = this.state;
    const {Trigger,Items} = this.props;
    return (
      <ul className="menu-list">
        <li
          onMouseEnter={this.toggle}
          onMouseLeave={this.toggle}
        >
          <a>{Trigger}</a>
          <ul>
            {
              isActive?
              (
                <>
                  {
                    Items.map(
                      (x, i) => <a key={i}>{x}</a>
                    )
                  }

                </>
              ): null
            }
          </ul>
        </li>
      </ul>
    );
  }
};
