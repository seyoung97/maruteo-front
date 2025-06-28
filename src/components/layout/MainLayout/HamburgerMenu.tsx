import {
  Accordion,
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerMenu = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>메뉴</DrawerHeader>
            <DrawerCloseTrigger asChild>
              <CloseButton position="absolute" top="12px" right="12px" />
            </DrawerCloseTrigger>

            <DrawerBody>
              <Accordion.Root collapsible w="100%">
                <Accordion.Item value="about-service">
                  <Accordion.ItemTrigger>
                    <Box flex="1" textAlign="left">
                      서비스 소개
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <VStack align="start" mt={2}>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          서비스 소개
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          참여 가이드
                        </Button>
                      </VStack>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
                <Box my={4}>홈</Box>
                <Accordion.Item value="community">
                  <Accordion.ItemTrigger>
                    <Box flex="1" textAlign="left">
                      커뮤니티
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <VStack align="start" mt={2}>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          공지사항
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          1:1 문의
                        </Button>
                      </VStack>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
                <Accordion.Item value="my-page">
                  <Accordion.ItemTrigger>
                    <Box flex="1" textAlign="left">
                      마이 페이지
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <VStack align="start" mt={2}>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                          onClick={() => { navigate("/mypage"); onClose(); }}
                        >
                          내 프로필 보기
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          내 수업 보기
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          수업 등록하기
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                        >
                          수강 내역 보기
                        </Button>
                      </VStack>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>

              <Box mt={4}>로그아웃</Box>
            </DrawerBody>

            <DrawerFooter justifyContent="flex-end">
              <Button variant="outline" onClick={onClose}>
                닫기
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </Drawer.Root>
  );
};

export default HamburgerMenu;