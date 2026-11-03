import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { ArrowLeft, ArrowRight, Sparkles, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UseCaseTag } from '@/types';
import { formatINR } from '@/utils/format';

export const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updatePreferences, resetQuestionnaire } = useQuestionnaire();
  const preferences = state.preferences;
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/recommendations');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 mb-2">
          <span className="font-semibold text-primary">Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-surface-elevated h-2.5 rounded-full overflow-hidden border border-border">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  What will you primarily use your laptop for?
                </h2>
                <p className="text-slate-400 text-sm">Select one or more target use-cases.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'programming', label: 'Programming & Dev', desc: 'Web, Backend, IDEs, Docker' },
                  { id: 'ai_ml', label: 'AI & Machine Learning', desc: 'Local models, PyTorch, CUDA' },
                  { id: 'cybersecurity', label: 'Cybersecurity', desc: 'VMs, Kali, packet analysis' },
                  { id: 'gaming', label: 'Gaming', desc: 'AAA games, high refresh rates' },
                  { id: 'video_editing', label: 'Video Editing', desc: 'Premiere, 4K render, timeline' },
                  { id: 'graphic_design', label: 'Graphic Design', desc: 'Photoshop, Figma, Illustrator' },
                  { id: 'office', label: 'Office & Business', desc: 'Excel, PPT, meetings, multitasking' },
                  { id: 'student', label: 'College & Student', desc: 'Assignments, coding, portability' },
                  { id: 'browsing', label: 'Everyday Browsing', desc: 'YouTube, Netflix, lightweight' },
                  { id: 'content_creation', label: 'Content Creation', desc: 'OBS, streaming, recording' },
                  { id: 'engineering_cad', label: 'Engineering & CAD', desc: 'SolidWorks, AutoCAD, simulations' },
                  { id: 'data_science', label: 'Data Science', desc: 'Python, large datasets, Jupyter' },
                ].map((item) => {
                  const isSelected = preferences.usage?.includes(item.id as UseCaseTag);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        const current = preferences.usage || [];
                        const next = isSelected
                          ? current.filter((u: any) => u !== item.id)
                          : [...current, item.id as UseCaseTag];
                        updatePreferences({ usage: next });
                      }}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10 text-white'
                          : 'bg-surface-elevated border-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{item.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  What is your maximum laptop budget?
                </h2>
                <p className="text-slate-400 text-sm">All prices strictly formatted in Indian Rupees (₹ INR).</p>
              </div>

              {/* Quick Budget Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Under ₹40,000', max: 40000 },
                  { label: '₹40,000 – ₹60,000', max: 60000 },
                  { label: '₹60,000 – ₹80,000', max: 80000 },
                  { label: '₹80,000 – ₹1,00,000', max: 100000 },
                  { label: '₹1,00,000 – ₹1,50,000', max: 150000 },
                  { label: 'Above ₹1,50,000', max: 250000 },
                ].map((b) => (
                  <button
                    key={b.max}
                    type="button"
                    onClick={() => updatePreferences({ budget_max: b.max })}
                    className={`p-4 rounded-xl text-center border font-semibold text-sm transition-all ${
                      preferences.budget_max === b.max
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                        : 'bg-surface-elevated text-slate-300 border-border hover:border-slate-600'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Custom Number Input */}
              <div className="pt-4 border-t border-border">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Or enter your exact custom maximum budget (₹):
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="20000"
                    step="5000"
                    value={preferences.budget_max || ''}
                    onChange={(e) => updatePreferences({ budget_max: Number(e.target.value) })}
                    className="w-full bg-surface-elevated border border-border rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="e.g. 75000"
                  />
                </div>
              </div>

              {/* Flexibility Mode */}
              <div className="pt-4 border-t border-border">
                <label className="block text-sm font-medium text-slate-300 mb-2">Budget Flexibility:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'strict', label: 'Strict Maximum', desc: 'Never show options over budget' },
                    { id: 'flex_5', label: 'Flexible by 5%', desc: 'Recommend if significantly better' },
                    { id: 'flex_10', label: 'Flexible by 10%', desc: 'Allow high-value upgrades' },
                  ].map((flex) => (
                    <button
                      key={flex.id}
                      type="button"
                      onClick={() => updatePreferences({ budget_flexibility: flex.id as any })}
                      className={`p-3 rounded-xl text-left border text-sm transition-all ${
                        preferences.budget_flexibility === flex.id
                          ? 'bg-primary/10 border-primary text-white'
                          : 'bg-surface-elevated border-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold">{flex.label}</div>
                      <div className="text-xs text-slate-400">{flex.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  Processor & Architecture Preference
                </h2>
                <p className="text-slate-400 text-sm">Select which CPU ecosystem you prefer or let the AI recommend the best.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'no_pref', title: 'Recommend Best for My Usage', desc: 'Algorithmic choice based on performance per ₹' },
                  { id: 'intel', title: 'Intel Core & Core Ultra', desc: 'i5, i7, i9, Core Ultra 5/7 with Intel Arc' },
                  { id: 'amd', title: 'AMD Ryzen & Ryzen AI', desc: 'Ryzen 5, 7, 9 with strong power efficiency & Radeon iGPU' },
                  { id: 'apple', title: 'Apple M-Series Silicon', desc: 'M2, M3 with industry-leading battery endurance' },
                ].map((p) => {
                  const isSelected = preferences.processor_preference?.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        updatePreferences({
                          processor_preference: isSelected ? [] : [p.id],
                        });
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10 text-white'
                          : 'bg-surface-elevated border-border text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-bold text-base mb-1">{p.title}</div>
                      <div className="text-xs text-slate-400">{p.desc}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  RAM & Storage Requirements
                </h2>
                <p className="text-slate-400 text-sm">Define your memory baseline and future expansion needs.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Minimum RAM:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[8, 16, 24, 32].map((gb) => (
                    <button
                      key={gb}
                      type="button"
                      onClick={() => updatePreferences({ ram_minimum: gb })}
                      className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                        preferences.ram_minimum === gb
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-elevated border-border text-slate-300'
                      }`}
                    >
                      {gb} GB
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Minimum NVMe SSD Storage:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[256, 512, 1000].map((gb) => (
                    <button
                      key={gb}
                      type="button"
                      onClick={() => updatePreferences({ storage_minimum: gb })}
                      className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                        preferences.storage_minimum === gb
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-elevated border-border text-slate-300'
                      }`}
                    >
                      {gb >= 1000 ? '1 TB SSD' : `${gb} GB SSD`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.ram_upgradeable_important || false}
                    onChange={(e) => updatePreferences({ ram_upgradeable_important: e.target.checked })}
                    className="w-5 h-5 rounded bg-surface border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-300">RAM Upgradeability is important (Avoid soldered-only RAM)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.storage_upgradeable_important || false}
                    onChange={(e) => updatePreferences({ storage_upgradeable_important: e.target.checked })}
                    className="w-5 h-5 rounded bg-surface border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-300">Dual M.2 SSD slot preferred for future expansion</span>
                </label>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  Graphics (GPU) Requirements
                </h2>
                <p className="text-slate-400 text-sm">Determine whether your workload requires dedicated VRAM.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface-elevated cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.gpu_dedicated_mandatory || false}
                    onChange={(e) => updatePreferences({ gpu_dedicated_mandatory: e.target.checked })}
                    className="w-5 h-5 rounded bg-surface border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">Dedicated GPU is Mandatory</div>
                    <div className="text-xs text-slate-400">Strictly filters out integrated graphics laptops</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface-elevated cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.cuda_required || false}
                    onChange={(e) => updatePreferences({ cuda_required: e.target.checked })}
                    className="w-5 h-5 rounded bg-surface border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">Require NVIDIA CUDA Cores</div>
                    <div className="text-xs text-slate-400">Essential for PyTorch, machine learning, and 3D rendering acceleration</div>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  Display & Visual Preferences
                </h2>
                <p className="text-slate-400 text-sm">Screen dimensions, panel type, and refresh rate.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Preferred Screen Size:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: '14" (Compact)', val: 14 },
                    { label: '15.6" (Standard)', val: 15.6 },
                    { label: '16" (Creator)', val: 16 },
                    { label: '17"+ (Desktop Repl.)', val: 17 },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => updatePreferences({ display_size_preference: [s.val] })}
                      className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
                        preferences.display_size_preference?.includes(s.val)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-elevated border-border text-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Minimum Refresh Rate:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '60 Hz (Standard)', val: 60 },
                    { label: '120-144 Hz (Smooth)', val: 120 },
                    { label: '165 Hz+ (Competitive)', val: 165 },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => updatePreferences({ refresh_rate_minimum: r.val })}
                      className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
                        preferences.refresh_rate_minimum === r.val
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-elevated border-border text-slate-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  What Matters Most to You?
                </h2>
                <p className="text-slate-400 text-sm">Assign importance (1 to 5) to adjust our dynamic recommendation weights.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'performance', label: 'Raw Performance' },
                  { key: 'battery', label: 'Battery Life' },
                  { key: 'durability', label: 'Durability & Build Rigidity' },
                  { key: 'portability', label: 'Lightweight & Portability' },
                  { key: 'gaming', label: 'Gaming Graphics' },
                  { key: 'value_for_money', label: 'Value for Money' },
                ].map((item) => {
                  const currentVal = (preferences.priorities as any)?.[item.key] || 3;
                  return (
                    <div key={item.key} className="p-4 rounded-xl border border-border bg-surface-elevated">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm text-white">{item.label}</span>
                        <span className="text-xs text-primary font-bold">{currentVal} / 5</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={currentVal}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          updatePreferences({
                            priorities: {
                              ...preferences.priorities,
                              [item.key]: val,
                            } as any,
                          });
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
                  Review & Final Preferences
                </h2>
                <p className="text-slate-400 text-sm">Summary of your parameters before algorithmic evaluation.</p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-elevated border border-border space-y-3 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-slate-400">Workload:</span>
                  <span className="font-semibold text-white capitalize">
                    {preferences.usage?.join(', ') || 'General use'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-slate-400">Budget Maximum:</span>
                  <span className="font-semibold text-white">{formatINR(preferences.budget_max || 80000)}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-slate-400">Budget Flexibility:</span>
                  <span className="font-semibold text-white uppercase">{preferences.budget_flexibility || 'strict'}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-slate-400">Minimum RAM:</span>
                  <span className="font-semibold text-white">{preferences.ram_minimum || 8} GB</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-slate-400">Minimum Storage:</span>
                  <span className="font-semibold text-white">{preferences.storage_minimum || 512} GB SSD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dedicated GPU Required:</span>
                  <span className="font-semibold text-white">
                    {preferences.gpu_dedicated_mandatory ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-border bg-surface-elevated text-slate-300 hover:text-white text-sm font-semibold flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
            <button
              type="button"
              onClick={resetQuestionnaire}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 p-2"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-700 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
          >
            {currentStep === totalSteps ? (
              <>
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Generate Recommendations</span>
              </>
            ) : (
              <>
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
