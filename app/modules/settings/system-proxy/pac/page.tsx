import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  useDisclosure,
} from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { useLoaderData, useRevalidator } from '@remix-run/react';
import toast from 'react-hot-toast';
import { queryPAC, updatePAC, queryDashboard } from '~/api';
import EditorComponent from '~/modules/MonacoEditorComponent';
import { invoke } from '@tauri-apps/api/core';

export const loader = async () => {
  const userID = localStorage.getItem('userID')!;
  const pac = await queryPAC({ userID });
  return pac;
};

export function Page() {
  const data = useLoaderData();
  const revalidator = useRevalidator();
  const userID = localStorage.getItem('userID')!;
  const { PAC } = data.SystemProxy.PAC;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<string>(PAC.replace(/\\n/g, '\n'));

  const handleEditorChange = async (v: string, onClose: () => void) => {
    try {
      await updatePAC({ userID, pac: v.replace(/\n/g, '\\n') });
      const dashboardResData = await queryDashboard({ userID });
      if (dashboardResData.proxyMode === 'pac') {
        await invoke('unset_pac_proxy');
        await invoke('setup_pac_proxy', {
          customRules: content,
          httpPort: dashboardResData.http[0].port,
          socksPort: dashboardResData.socks[0].port,
        });
        toast.success(t('Save success and auto configured pac rules'));
      } else {
        toast.success(t('Save success'));
      }

      revalidator.revalidate();
      onClose();
    } catch (e) {
      toast.error(t('Invalid text format'));
    }
    return;
  };

  return (
    <>
      <Button
        color="primary"
        className=""
        onPress={() => {
          onOpen();
        }}
      >
        <span className="i-feather-edit" /> {t('Edit')}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('PAC settings')}
              </ModalHeader>
              <ModalBody className="flex w-full flex-col items-center justify-center px-8">
                <Card>
                  <CardBody className="gap-8 p-4">
                    <p className="text-sm text-gray-500">
                      {t(
                        'Plese adding the website url you want to use proxy network to access.Edit PAC settings will affect the system proxy settings when it is on PAC mode.',
                      )}
                    </p>
                    <EditorComponent
                      className="h-48"
                      defaultLanguage="text"
                      defaultValue={content}
                      onChange={(v, event) => {
                        setContent(v);
                      }}
                    />
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t('Cancel')}
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await handleEditorChange(content, onClose);
                  }}
                >
                  {t('Save')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
