import React, { FC } from 'react';

const MenuFooter: FC<any> = (props) => {
    if (props?.collapsed) return undefined;
    return (
        <div
        //   style={{
        //     textAlign: "center",
        //     paddingBlockStart: 12,
        //     color: token.colorPrimary,
        //   }}
        >
          <div>© 2023 Made with love</div>
          <div>by ScriptTag Team</div>
        </div>
    );
}
 
export default MenuFooter;