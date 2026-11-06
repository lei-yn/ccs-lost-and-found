import React, { useState } from 'react';

/**
 * CustodyLocationForm
 *
 * Dynamically reveals a required 'Recipient / Staff Name' input field
 * when choosing 'I turned it in to the CCS Office' or 'I gave it to a staff member'.
 */
const CUSTODY_OPTIONS = [
  {
    id: 'holding_by_finder',
    label: 'I am currently holding the item',
    description: 'You will keep the item safe until claimed',
    requiresStaff: false,
    icon: 'fa-solid fa-hand-holding',
  },
  {
    id: 'turned_in_office',
    label: 'I turned it in to the CCS Office',
    description: 'Safely surrendered to the CCS administration office',
    requiresStaff: true,
    icon: 'fa-solid fa-building-columns',
  },
  {
    id: 'given_to_staff',
    label: 'I gave it to a staff member',
    description: 'Handed over to a faculty instructor, custodian, or guard',
    requiresStaff: true,
    icon: 'fa-solid fa-user-tie',
  },
  {
    id: 'direct_handover',
    label: 'Direct Handover / I know the owner',
    description: 'Personally handed back to the owner',
    requiresStaff: false,
    icon: 'fa-solid fa-handshake',
  },
];

export default function CustodyLocationForm({ onSubmit, initialCustody = '' }) {
  const [custodyChoice, setCustodyChoice] = useState(initialCustody);
  const [recipientStaffName, setRecipientStaffName] = useState('');
  const [error, setError] = useState('');

  // Dynamically determines if recipient/staff name is mandatory
  const isStaffRequired =
    custodyChoice === 'turned_in_office' || custodyChoice === 'given_to_staff';

  const handleCustodyChange = (choiceId) => {
    setCustodyChoice(choiceId);
    setError('');
    // Reset staff name if switched to an option that doesn't require it
    if (choiceId !== 'turned_in_office' && choiceId !== 'given_to_staff') {
      setRecipientStaffName('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!custodyChoice) {
      setError('Please specify where the item is currently located.');
      return;
    }

    if (isStaffRequired && !recipientStaffName.trim()) {
      setError('Please enter the Recipient / Staff Name who received the item.');
      return;
    }

    setError('');
    if (onSubmit) {
      onSubmit({
        custodyChoice,
        recipientStaffName: isStaffRequired ? recipientStaffName.trim() : null,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border border-slate-200 rounded-2xl space-y-4 text-xs font-sans shadow-sm"
    >
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          1. Where is the item now? <span className="text-red-500">*</span>
        </label>

        <div className="space-y-2">
          {CUSTODY_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`flex items-start p-3 rounded-2xl border-2 cursor-pointer transition ${
                custodyChoice === option.id
                  ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950'
                  : 'border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <input
                type="radio"
                name="finderCustody"
                value={option.id}
                checked={custodyChoice === option.id}
                onChange={() => handleCustodyChange(option.id)}
                required
                className="mt-1 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center space-x-2">
                  <i className={`${option.icon} text-slate-400`}></i>
                  <span className="font-bold text-xs">{option.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* DYNAMIC FIELD: Revealed when custody choice is Office or Staff */}
      {isStaffRequired && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1.5 transition">
          <label
            htmlFor="recipientStaffName"
            className="block text-xs font-bold text-amber-950"
          >
            Recipient / Staff Name <span className="text-red-500">*</span>
          </label>
          <input
            id="recipientStaffName"
            type="text"
            required
            value={recipientStaffName}
            onChange={(e) => {
              setRecipientStaffName(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., Sir Ronald (CCS Custodian), Guard Santos"
            className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-[10px] text-amber-800">
            Please specify who received the item so staff can verify physical custody.
          </p>
        </div>
      )}

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
      >
        <i className="fa-solid fa-paper-plane"></i>
        <span>Submit Verification Report</span>
      </button>
    </form>
  );
}
