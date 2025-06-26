import {
  Button,
  Dialog,
  HStack
} from "@chakra-ui/react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

export function CommonModal({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "확인",
  cancelText = "취소", 
  onConfirm,
  onCancel,
  showCancel = true,
  size = "md"
}: CommonModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <Dialog.Root 
      open={isOpen} 
      onOpenChange={(e) => !e.open && onClose()}
      size={size}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          bg="white"
          borderRadius="2xl"
          maxW="90vw"
          mx="auto"
          my="auto"
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          boxShadow="xl"
          p={6}
        >
          {title && (
            <Dialog.Header pb={4} textAlign="center">
              <Dialog.Title fontSize="lg" fontWeight="bold" color="gray.800">
                {title}
              </Dialog.Title>
            </Dialog.Header>
          )}
          
          <Dialog.Body px={0} py={2}>
            {children}
          </Dialog.Body>
          
          <Dialog.Footer pt={6} px={0}>
            <HStack gap="3" w="100%">
              {showCancel && (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  flex={1}
                  h="48px"
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.600"
                  _hover={{ bg: "gray.50" }}
                >
                  {cancelText}
                </Button>
              )}
              <Button
                bg="green.500"
                color="white"
                onClick={handleConfirm}
                flex={1}
                h="48px"
                borderRadius="full"
                _hover={{ bg: "green.600" }}
                fontWeight="semibold"
              >
                {confirmText}
              </Button>
            </HStack>
          </Dialog.Footer>
          
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}