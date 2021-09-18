import React from 'react';
import cx from 'classnames';

interface ListProps {
  title: string;
  prefixCls?: string;
}
const List: React.FC<ListProps> = (props) => {
  const { prefixCls, title } = props;
  return (
    <dl className={`${prefixCls}`}>
      <dt className={`${prefixCls}--title`}>{title}</dt>
      <dd className={`${prefixCls}-item__wrap`}>
        <div className={`${prefixCls}-item__content`}>
          Focus secondary search bar
        </div>
        <code>?</code>
      </dd>
    </dl>
  );
};

List.defaultProps = {
  prefixCls: 'shortcuts-list',
};

export default List;
