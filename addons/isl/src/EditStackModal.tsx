/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {FlexRow, ScrollY} from './ComponentUtils';
import FileStackEditPanel from './FileStackEditPanel';
import {Modal} from './Modal';
import {SplitStackEditPanel} from './SplitStackEditPanel';
import {StackEditConfirmButtons} from './StackEditConfirmButtons';
import {StackEditSubTree} from './StackEditSubTree';
import {T} from './i18n';
import {loadingStackState, editingStackHashes} from './stackEditState';
import {VSCodePanels, VSCodePanelTab, VSCodePanelView} from '@vscode/webview-ui-toolkit/react';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';

/// Show a <Modal /> when editing a stack.
export function MaybeEditStackModal() {
  const loadingState = useRecoilValue(loadingStackState);
  const stackHashes = useRecoilValue(editingStackHashes);

  const isEditing = stackHashes.size > 0;
  const isLoaded = isEditing && loadingState.state === 'hasValue';

  return isLoaded ? <LoadedEditStackModal /> : null;
}

/// A <Modal /> for stack editing UI.
function LoadedEditStackModal() {
  type Tab = 'commits' | 'files' | 'split';
  const [activeTab, setActiveTab] = useState<Tab>('commits');
  const getPanelViewStyle = (tab: string): React.CSSProperties => {
    return {
      overflow: 'unset',
      display: 'block',
      padding: tab === activeTab ? 'var(--pad) 0 0 0' : '0',
    };
  };

  return (
    <Modal>
      <VSCodePanels
        activeid={`tab-${activeTab}`}
        style={{
          // Allow dropdown to show content.
          overflow: 'unset',
        }}
        onChange={e => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tab: Tab | undefined = (e.target as any)?.activetab?.id?.replace('tab-', '');
          tab && setActiveTab(tab);
        }}>
        <VSCodePanelTab id="tab-commits">
          <T>Commits</T>
        </VSCodePanelTab>
        <VSCodePanelTab id="tab-files">
          <T>Files</T>
        </VSCodePanelTab>
        <VSCodePanelTab id="tab-split">
          <T>Split</T>
          <sup>
            <sup>(Beta)</sup>
          </sup>
        </VSCodePanelTab>
        <VSCodePanelView style={getPanelViewStyle('commits')} id="view-commits">
          {/* Skip rendering (which might trigger slow dependency calculation) if the tab is inactive */}
          <ScrollY maxSize="70vh">
            {activeTab === 'commits' && (
              <StackEditSubTree activateSplitTab={() => setActiveTab('split')} />
            )}
          </ScrollY>
        </VSCodePanelView>
        <VSCodePanelView style={getPanelViewStyle('files')} id="view-files">
          {activeTab === 'files' && <FileStackEditPanel />}
        </VSCodePanelView>
        <VSCodePanelView style={getPanelViewStyle('split')} id="view-split">
          {activeTab === 'split' && <SplitStackEditPanel />}
        </VSCodePanelView>
      </VSCodePanels>
      <FlexRow style={{padding: 'var(--pad) 0', justifyContent: 'flex-end'}}>
        <StackEditConfirmButtons />
      </FlexRow>
    </Modal>
  );
}
