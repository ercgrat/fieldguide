import {
  Menu as ChakraMenu,
  MenuProps,
  MenuButton as ChakraMenuButton,
  MenuButtonProps,
  MenuList as ChakraMenuList,
  MenuListProps,
  MenuItem as ChakraMenuItem,
  MenuItemProps,
  Button,
  useMenuContext,
  forwardRef
} from '@chakra-ui/react';

const MenuBase: React.FC<MenuProps> = props => {
  return <ChakraMenu {...props} />;
};

const MenuButton: React.FC<
  Omit<MenuButtonProps, 'as'> & React.ComponentProps<typeof Button>
> = props => {
  return <ChakraMenuButton as={Button} size="sm" variant="link" {...props} />;
};

const MenuList: React.FC<MenuListProps> = props => {
  const { isOpen } = useMenuContext();
  return isOpen ? <ChakraMenuList {...props} /> : null;
};

const MenuItem = forwardRef<MenuItemProps, 'div'>((props, ref) => {
  return <ChakraMenuItem {...props} ref={ref} />;
});

const Menu = Object.assign(MenuBase, {
  Button: MenuButton,
  List: MenuList,
  Item: MenuItem
});

export default Menu;
