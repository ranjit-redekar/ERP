import Icon from "@ant-design/icons";
import { DashboardIcon, GroupIcon, InventoryIcon, PurchaseIcon, RupeeIcon, SaleIcon, SettingIcon } from "../common/Icons";

// Define an interface for the possible icon names
interface IconMap {
    [key: string]: React.ElementType;
}

const iconComponents: IconMap = {
    DashboardIcon: DashboardIcon,
    SettingIcon: SettingIcon,
    SaleIcon: SaleIcon,
    PurchaseIcon: PurchaseIcon,
    GroupIcon: GroupIcon,
    InventoryIcon: InventoryIcon,
    RupeeIcon: RupeeIcon,
};

const defaultStyle = { fontSize: '1.3rem', fontWeight: 'bold' };

function getIcon(iconName: keyof IconMap, style: React.CSSProperties = {}): JSX.Element | null {
    const IconComponent = iconComponents[iconName];

    if (!IconComponent) {
        console.error(`Icon "${iconName}" not found`);
        return null; // Handle the case when the icon name is not recognized
    }

    const iconStyle = { ...defaultStyle, ...style }; // Merge defaultStyle with the provided style

    return (
        <Icon style={iconStyle} component={IconComponent} />
    );
}

export { getIcon }