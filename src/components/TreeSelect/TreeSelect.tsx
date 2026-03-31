import React, { useState, useRef, useEffect } from 'react';
import './TreeSelect.css';

export interface TreeOption {
  value: string | number;
  label: string;
  children?: TreeOption[];
}

export interface TreeSelectProps {
  /** Hierarchical data */
  treeData: TreeOption[];
  /** Selected value */
  value?: string | number;
  /** Label */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Callback for value changes */
  onChange?: (value: string | number) => void;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
}

const TreeNode = ({
  node,
  selectedValue,
  onSelect,
  depth = 0,
}: {
  node: TreeOption;
  selectedValue?: string | number;
  onSelect: (value: string | number) => void;
  depth: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    onSelect(node.value);
  };

  return (
    <li className="storybook-treeselect-node" style={{ paddingLeft: depth === 0 ? 0 : 20 }}>
      <div 
        className={[
          'storybook-treeselect-node-content',
          selectedValue === node.value ? 'storybook-treeselect-node-content--selected' : ''
        ].join(' ')}
        onClick={handleSelect}
      >
        <div 
          className={[
            'storybook-treeselect-toggle',
            isExpanded ? 'storybook-treeselect-toggle--expanded' : '',
            !hasChildren ? 'storybook-treeselect-toggle--hidden' : ''
          ].join(' ')}
          onClick={hasChildren ? handleToggle : undefined}
          style={{ visibility: hasChildren ? 'visible' : 'hidden' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <span>{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <ul className="storybook-treeselect-nodes">
          {node.children!.map((child) => (
            <TreeNode 
              key={child.value} 
              node={child} 
              selectedValue={selectedValue} 
              onSelect={onSelect} 
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const TreeSelect = ({
  treeData = [],
  value: selectedValue,
  label,
  placeholder = 'Select an item...',
  onChange,
  error,
  disabled = false,
}: TreeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to find label by value in recursive tree
  const findLabel = (data: TreeOption[], val?: string | number): string | undefined => {
    for (const node of data) {
      if (node.value === val) return node.label;
      if (node.children) {
        const found = findLabel(node.children, val);
        if (found) return found;
      }
    }
    return undefined;
  };

  const selectedLabel = findLabel(treeData, selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (val: string | number) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div 
      className={[
        'storybook-treeselect-container',
        isOpen ? 'storybook-treeselect-container--open' : '',
        error ? 'storybook-treeselect--error' : '',
        disabled ? 'storybook-treeselect--disabled' : ''
      ].join(' ')} 
      ref={containerRef}
    >
      {label && <label className="storybook-treeselect-label">{label}</label>}
      
      <div 
        className="storybook-treeselect-trigger" 
        onClick={handleToggle}
      >
        <span className={!selectedLabel ? 'storybook-treeselect-placeholder' : ''}>
          {selectedLabel || placeholder}
        </span>
        <div className="storybook-treeselect-arrow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="storybook-treeselect-dropdown">
        {treeData.length > 0 ? (
          <ul className="storybook-treeselect-nodes">
            {treeData.map((node) => (
              <TreeNode 
                key={node.value} 
                node={node} 
                selectedValue={selectedValue} 
                onSelect={handleSelect} 
                depth={0}
              />
            ))}
          </ul>
        ) : (
          <div className="storybook-treeselect-node-content" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            No data available
          </div>
        )}
      </div>

      {error && <span className="storybook-treeselect-error-msg" style={{ fontSize: '12px', color: '#ef4444', marginTop: '2px' }}>{error}</span>}
    </div>
  );
};
