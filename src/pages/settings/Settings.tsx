import { Radio, Space, Tabs } from 'antd';
import MenuItems from '../../configs/sidenav-menus.json';
import { getIcon } from '../../common/components/Utils';

const Settings: React.FC = () => {
  return (
      <Tabs
        items={MenuItems.filter((menu) => menu?.isShowInSettings).map((menu, i) => {
          return {
            label: <><span>{getIcon(menu?.icon)}</span><span>{menu?.name}</span></>,
            key: String(i + 1),
            children: `Settings for ${menu?.name}`,
          };
        })}
      />
  );
};

export default Settings;