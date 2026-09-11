
import { useEffect, useRef, useState } from 'react'

import {
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Crosshair,
  Grid2X2,
  Lightbulb,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Plus,
  Send,
  Mic,
  Volume2,
  Square,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
  X,
  Zap,
  CheckCircle2,
  Minus,
  Trash2,
} from 'lucide-react'

import LifeCore3D from './LifeCore3D'
import { supabase } from './lib/supabase'

const navItems = [
  {
    label: 'Overview',
    icon: Grid2X2,
    color: '#8b7cff',
  },
  {
    label: 'AI Assistant',
    icon: BrainCircuit,
    color: '#c56cff',
  },
  {
    label: 'Goals',
    icon: Target,
    color: '#ff8a3d',
  },
  {
    label: 'Planner',
    icon: CalendarDays,
    color: '#25ddff',
  },
  {
    label: 'Finance',
    icon: CircleDollarSign,
    color: '#35e5a5',
  },
]

const defaultGoals = [
  {
    id: 1,
    name: 'Build something great',
    category: 'Career',
    progress: 74,
    status: 'On track',
    priority: 'Hard',
  },
  {
    id: 2,
    name: 'Learn every day',
    category: 'Personal',
    progress: 91,
    status: 'Excellent',
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Stay consistent',
    category: 'Health',
    progress: 68,
    status: 'Growing',
    priority: 'Medium',
  },
]

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [method, setMethod] = useState('email')
  const [value, setValue] = useState('')
  const [otpMode, setOtpMode] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const sendOtp = async () => {
    if (!value.trim()) return

    if (method === 'phone') {
      onLogin()
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: value.trim(),
      })

      if (error) throw error

      setOtpMode(true)
    } catch (error) {
      window.alert(error.message)
    }
  }
  const verifyOtp = async () => {
    try {
      const { error } = await supabase.auth.verifyOtp(
        method === 'email'
          ? {
            email: value.trim(),
            token,
            type: 'email',
          }
          : {
            phone: value.trim(),
            token,
            type: 'sms',
          }
      )

      if (error) throw error

      onLogin()
    } catch (error) {
      window.alert(error.message)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="auth-card">
        <div className="auth-logo">
          <Sparkles size={22} />
        </div>

        <div className="auth-kicker">
          LIFEOS AI
        </div>

        <h1>
          Your life.
          <br />
          <span>Your intelligence.</span>
        </h1>

        <p>
          {otpMode
            ? `Enter the verification code sent to ${value}`
            : 'Sign in to your personal intelligence system.'}
        </p>

        {!otpMode ? (
          <>
            <div className="auth-mode-switch">
              <button
                type="button"
                className={mode === 'login' ? 'active' : ''}
                onClick={() => setMode('login')}
              >
                Login
              </button>

              <button
                type="button"
                className={mode === 'signup' ? 'active' : ''}
                onClick={() => setMode('signup')}
              >
                Create Account
              </button>
            </div>

            <div className="auth-method-switch">
              <button
                type="button"
                className={method === 'email' ? 'active' : ''}
                onClick={() => setMethod('email')}
              >
                Gmail / Email
              </button>

              <button
                type="button"
                className={method === 'phone' ? 'active' : ''}
                onClick={() => setMethod('phone')}
              >
                Phone
              </button>
            </div>

            <div className="auth-input-wrap">
              <span>
                {method === 'email' ? '@' : '✆'}
              </span>

              <input
                type={method === 'email' ? 'email' : 'tel'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  method === 'email'
                    ? 'Enter your Gmail or email'
                    : '+91 98765 43210'
                }
              />
            </div>

            <button
              type="button"
              className="auth-primary-button"
              onClick={sendOtp}
              disabled={!value.trim()}
            >
              Send OTP
              <ArrowUpRight size={18} />
            </button>
          </>
        ) : (
          <>
            <div className="otp-grid">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const next = [...otp]
                    next[index] = e.target.value.replace(/\D/g, '')
                    setOtp(next)
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              className="auth-primary-button"
              onClick={verifyOtp}
            >
              Verify & Continue
              <ArrowUpRight size={18} />
            </button>

            <div className="auth-secondary-actions">
              <button
                type="button"
                onClick={() => setOtpMode(false)}
              >
                Change contact
              </button>

              <button type="button">
                Resend OTP
              </button>
            </div>
          </>
        )}

        <div className="auth-footer">
          <span />
          <small>SECURE LIFEOS ACCESS</small>
          <span />
        </div>
      </div>
    </div>
  )
}

function SectionKicker({ children }) {
  return <span className="section-kicker">{children}</span>
}

function OverviewDashboard({ setActive }) {
  return (
    <>
      <section className="hero-section overview-hero-upgraded">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span />
            PERSONAL INTELLIGENCE SYSTEM
          </div>

          <h1>
            Your life.
            <br />
            <span>Intelligently</span>
            <br />
            <span className="hero-blue">organized.</span>
          </h1>

          <p>
            One intelligent system for your goals, focus, habits, planning
            and everything that moves your life forward.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => setActive('AI Assistant')}
            >
              <Sparkles size={18} />
              Enter LifeOS
              <ArrowUpRight size={17} />
            </button>

            <button
              className="secondary-button"
              onClick={() => setActive('Goals')}
            >
              Explore system
            </button>
          </div>
        </div>

        <div className="hero-visual overview-hero-visual">
          <div className="hero-visual-glow" />
          <div className="hero-grid-glow" />

          <div className="hero-3d-stage">
            <LifeCore3D mode="Overview" />
          </div>

          <div className="floating-card floating-focus">
            <span>FOCUS</span>
            <strong>86%</strong>
          </div>

          <div className="floating-card floating-goal">
            <span>GOAL</span>
            <strong>ON TRACK</strong>
          </div>

          <div className="floating-card floating-ai">
            <span className="pulse-dot" />
            <span>AI is thinking</span>
            <b>•••</b>
          </div>

          <div className="hero-system-tag">
            <span />
            LIFEOS CORE ACTIVE
          </div>
        </div>
      </section>

      <section className="overview-stats">
        <div className="stat-card stat-focus">
          <div className="stat-icon">
            <Zap size={20} />
          </div>

          <span>FOCUS SCORE</span>
          <strong>86%</strong>
          <small>+8% this week</small>
        </div>

        <div className="stat-card stat-tasks">
          <div className="stat-icon">
            <Check size={20} />
          </div>

          <span>TASKS COMPLETED</span>
          <strong>24</strong>
          <small>Today</small>
        </div>

        <div className="stat-card stat-balance">
          <div className="stat-icon">
            <Sparkles size={20} />
          </div>

          <span>LIFE BALANCE</span>
          <strong>92%</strong>
          <small>Excellent</small>
        </div>
      </section>

      <section className="overview-ai-card">
        <div>
          <SectionKicker>AI INTELLIGENCE</SectionKicker>

          <h2>Your personal intelligence layer.</h2>

          <p>
            LifeOS connects your goals, plans, habits and decisions into one
            intelligent system.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setActive('AI Assistant')}
        >
          Talk to LifeOS
          <ArrowUpRight size={17} />
        </button>
      </section>
    </>
  )
}

function GoalsDashboard({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) {
  const primaryGoal = goals[0] || defaultGoals[0]

  const adjustProgress = (goal, delta) => {
    const next = Math.max(
      0,
      Math.min(100, goal.progress + delta)
    )

    onUpdateGoal(goal.id, {
      progress: next,
      status:
        next >= 100
          ? 'Completed'
          : next >= 70
            ? 'On track'
            : next > 0
              ? 'In progress'
              : 'Just started',
    })
  }

  return (
    <section className="goals-dashboard">

      <div className="goals-heading">
        <div>
          <SectionKicker>GOAL CONTROL</SectionKicker>

          <h2>Turn ambition into progress.</h2>

          <p>
            Set a target, build momentum, and let LifeOS
            keep you moving.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onAddGoal}
        >
          <Plus size={18} />
          Set new goal
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="goals-command-strip">

        <div>
          <span>ACTIVE OBJECTIVES</span>
          <strong>
            {String(goals.length).padStart(2, '0')}
          </strong>
        </div>

        <div>
          <span>AVERAGE PROGRESS</span>
          <strong>
            {goals.length
              ? Math.round(
                goals.reduce(
                  (sum, goal) =>
                    sum + goal.progress,
                  0
                ) / goals.length
              )
              : 0}
            %
          </strong>
        </div>

        <div>
          <span>COMPLETED</span>
          <strong>
            {
              goals.filter(
                (goal) => goal.progress >= 100
              ).length
            }
          </strong>
        </div>

        <div className="goal-system-live">
          <i />
          SYSTEM TRACKING
        </div>

      </div>

      <div className="goals-grid">

        <div className="primary-goal-card">

          <div className="goal-card-glow" />

          <div className="goal-core-visual">
            <LifeCore3D mode="Goals" />
          </div>

          <div className="goal-card-top">
            <span>PRIMARY GOAL</span>

            <strong>
              {primaryGoal.progress}%
            </strong>
          </div>

          <h3>
            {primaryGoal.name}
          </h3>

          <div className="primary-goal-meta">

            <span>
              {primaryGoal.category}
            </span>

            <span
              className={`priority-${String(
                primaryGoal.priority
              ).toLowerCase()}`}
            >
              {primaryGoal.priority}
            </span>

            {primaryGoal.deadline && (
              <span>
                Target {primaryGoal.deadline}
              </span>
            )}

          </div>

          <div className="goal-progress-track">

            <div
              className="goal-progress-fill"
              style={{
                width: `${primaryGoal.progress}%`,
              }}
            />

          </div>

          <div className="goal-progress-label">

            <span>
              Execution progress
            </span>

            <b>
              {primaryGoal.progress} / 100
            </b>

          </div>

          <div className="goal-milestones">

            <span
              className={
                primaryGoal.progress >= 25
                  ? 'completed'
                  : ''
              }
            >
              <Check size={13} />
              Vision defined
            </span>

            <span
              className={
                primaryGoal.progress >= 60
                  ? 'completed'
                  : ''
              }
            >
              <Check size={13} />
              First milestone
            </span>

            <span
              className={
                primaryGoal.progress >= 100
                  ? 'completed'
                  : ''
              }
            >
              <span className="empty-circle" />
              Final execution
            </span>

          </div>

          <div className="primary-goal-controls">

            <button
              onClick={() =>
                adjustProgress(primaryGoal, -5)
              }
              aria-label="Decrease progress"
            >
              <Minus size={14} />
            </button>

            <button
              onClick={() =>
                adjustProgress(primaryGoal, 5)
              }
              aria-label="Increase progress"
            >
              <Plus size={14} />
              +5%
            </button>

            <button
              onClick={() =>
                adjustProgress(
                  primaryGoal,
                  100 - primaryGoal.progress
                )
              }
              aria-label="Complete goal"
            >
              <CheckCircle2 size={15} />
              Complete
            </button>

          </div>

        </div>

        <div className="goal-mini-card">

          <div className="goal-mini-icon orange">
            <Target size={20} />
          </div>

          <span>Active goals</span>

          <strong>
            {String(goals.length).padStart(2, '0')}
          </strong>

          <small>
            Objectives in your system
          </small>

        </div>

        <div className="goal-mini-card streak-card">

          <div className="goal-mini-icon yellow">
            <Zap size={20} />
          </div>

          <span>Current streak</span>

          <strong>18 days</strong>

          <small>
            Personal best
          </small>

        </div>

      </div>

      <div className="active-goals-card">

        <div className="active-goals-header">

          <div>
            <SectionKicker>
              ACTIVE GOALS
            </SectionKicker>

            <h3>
              Your execution board
            </h3>
          </div>

          <button
            className="goal-header-add"
            onClick={onAddGoal}
          >
            <Plus size={14} />
            Add goal
          </button>

        </div>

        <div className="goal-list">

          {goals.map((goal) => (

            <div
              className="goal-row"
              key={goal.id}
            >

              <div className="goal-row-info">

                <div
                  className={`goal-dot ${goal.progress >= 100
                    ? 'done'
                    : ''
                    }`}
                />

                <div>

                  <strong>
                    {goal.name}
                  </strong>

                  <span>
                    {goal.category}
                    {' · '}
                    {goal.priority}
                    {' · '}
                    {goal.status}

                    {goal.deadline
                      ? ` · ${goal.deadline}`
                      : ''}
                  </span>

                </div>

              </div>

              <div className="goal-row-actions">

                <button
                  onClick={() =>
                    adjustProgress(goal, -5)
                  }
                  aria-label={`Decrease ${goal.name} progress`}
                >
                  <Minus size={13} />
                </button>

                <div className="goal-row-progress">

                  <div className="goal-progress-track">

                    <div
                      className="goal-progress-fill"
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    />

                  </div>

                  <b>
                    {goal.progress}%
                  </b>

                </div>

                <button
                  onClick={() =>
                    adjustProgress(goal, 5)
                  }
                  aria-label={`Increase ${goal.name} progress`}
                >
                  <Plus size={13} />
                </button>

                <button
                  onClick={() =>
                    onUpdateGoal(goal.id, {
                      progress: 100,
                      status: 'Completed',
                    })
                  }
                  aria-label={`Complete ${goal.name}`}
                >
                  <CheckCircle2 size={14} />
                </button>

                <button
                  className="goal-delete-button"
                  onClick={() =>
                    onDeleteGoal(goal.id)
                  }
                  aria-label={`Delete ${goal.name}`}
                >
                  <Trash2 size={14} />
                </button>

              </div>

            </div>

          ))}

          {goals.length === 0 && (
            <div className="empty-goals-state">

              <Target size={28} />

              <strong>
                No active goals
              </strong>

              <span>
                Create your first objective and
                start building momentum.
              </span>

              <button
                className="primary-button"
                onClick={onAddGoal}
              >
                <Plus size={17} />
                Create first goal
              </button>

            </div>
          )}

        </div>

      </div>

    </section>
  )
}

function PlannerDashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      time: '08:00',
      title: 'Deep work',
      type: 'focus',
      duration: '90 min',
      priority: 'Hard',
      completed: false,
    },
    {
      id: 2,
      time: '11:30',
      title: 'AI planning',
      type: 'ai',
      duration: '45 min',
      priority: 'Medium',
      completed: false,
    },
    {
      id: 3,
      time: '14:00',
      title: 'Learning session',
      type: 'learn',
      duration: '60 min',
      priority: 'Medium',
      completed: false,
    },
    {
      id: 4,
      time: '17:30',
      title: 'Daily review',
      type: 'review',
      duration: '30 min',
      priority: 'Easy',
      completed: false,
    },
  ])

  const [showTaskModal, setShowTaskModal] = useState(false)

  const [newTask, setNewTask] = useState({
    title: '',
    time: '19:00',
    duration: '45 min',
    type: 'focus',
    priority: 'Medium',
  })

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed,
          }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    )
  }

  const createTask = () => {
    const title = newTask.title.trim()

    if (!title) return

    const nextId =
      tasks.length > 0
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1

    setTasks((previous) => [
      ...previous,
      {
        id: nextId,
        time: newTask.time,
        title,
        type: newTask.type,
        duration: newTask.duration,
        priority: newTask.priority,
        completed: false,
      },
    ])

    setShowTaskModal(false)

    setNewTask({
      title: '',
      time: '19:00',
      duration: '45 min',
      type: 'focus',
      priority: 'Medium',
    })
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
        (completedCount / tasks.length) * 100
      )

  const typeLabel = {
    focus: 'FOCUS',
    ai: 'AI SYSTEM',
    learn: 'LEARNING',
    review: 'REFLECTION',
  }

  const typeDescription = {
    focus: 'Deep concentration block',
    ai: 'Plan, think and optimize',
    learn: 'Build knowledge and skill',
    review: 'Close the loop and reset',
  }

  return (
    <section className="planner-dashboard">

      <div className="planner-3d-background" aria-hidden="true">
        <LifeCore3D mode="Planner" />
      </div>
      <div className="planner-hero">
        <div className="planner-hero-copy">
          <SectionKicker>SMART PLANNER</SectionKicker>

          <h1>
            Your day,
            <br />
            intelligently structured.
          </h1>

          <p>
            LifeOS builds your schedule around focus,
            energy and the things that actually matter.
          </p>
        </div>

        <div className="planner-day-control">
          <button
            className="planner-day-arrow"
            type="button"
          >
            <Minus size={16} />
          </button>

          <div className="planner-date-card">
            <CalendarDays size={18} />

            <div>
              <strong>Today</strong>
              <span>Execution mode</span>
            </div>
          </div>

          <button
            className="planner-day-arrow"
            type="button"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="planner-command-strip">
        <div className="planner-command-card">
          <span>SCHEDULED</span>

          <strong>
            {String(tasks.length).padStart(2, '0')}
          </strong>

          <small>blocks today</small>
        </div>

        <div className="planner-command-card">
          <span>COMPLETED</span>

          <strong>
            {String(completedCount).padStart(2, '0')}
          </strong>

          <small>execution blocks</small>
        </div>

        <div className="planner-command-card planner-progress-card">
          <span>DAY PROGRESS</span>

          <strong>{progress}%</strong>

          <div className="planner-mini-progress">
            <span
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="planner-system-live">
          <span />
          AI OPTIMIZED
        </div>
      </div>

      <div className="planner-section-heading">
        <div>
          <SectionKicker>EXECUTION TIMELINE</SectionKicker>
          <h2>Your flow</h2>
        </div>

        <button
          className="planner-add-button"
          type="button"
          onClick={() => setShowTaskModal(true)}
        >
          <Plus size={17} />
          Add task
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="planner-timeline">
        {tasks
          .slice()
          .sort((a, b) =>
            a.time.localeCompare(b.time)
          )
          .map((task) => (
            <div
              key={task.id}
              className={`planner-task type-${task.type} ${task.completed ? 'completed' : ''
                }`}
            >
              <div className="planner-task-time">
                {task.time}
              </div>

              <div className="planner-task-line">
                <span className="planner-task-node" />
              </div>

              <div className="planner-task-card">
                <div className="planner-task-top">
                  <div>
                    <span className="planner-task-type">
                      {typeLabel[task.type]}
                    </span>

                    <h3>{task.title}</h3>

                    <p>
                      {typeDescription[task.type]}
                    </p>
                  </div>

                  <div className="planner-task-duration">
                    <Zap size={14} />
                    {task.duration}
                  </div>
                </div>

                <div className="planner-task-bottom">
                  <span>
                    {task.completed
                      ? 'Execution complete'
                      : 'Ready for execution'}
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        color:
                          task.priority === 'Hard'
                            ? '#ff9c62'
                            : task.priority === 'Easy'
                              ? '#6fe8bf'
                              : '#8fb8ff',
                      }}
                    >
                      {task.priority}
                    </span>

                    <button
                      type="button"
                      className="planner-task-complete"
                      onClick={() =>
                        toggleTask(task.id)
                      }
                    >
                      <Check size={15} />

                      {task.completed
                        ? 'Completed'
                        : 'Complete'}
                    </button>

                    <button
                      type="button"
                      className="planner-task-complete"
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      style={{
                        color: '#ff8d8d',
                      }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="planner-bottom-grid">
        <div className="planner-energy-card">
          <div className="planner-card-heading">
            <div>
              <SectionKicker>ENERGY MAP</SectionKicker>
              <h3>Protect your peak hours.</h3>
            </div>

            <Zap size={19} />
          </div>

          <div className="planner-energy-bars">
            <div>
              <span>Morning</span>

              <div>
                <i style={{ width: '92%' }} />
              </div>

              <strong>92%</strong>
            </div>

            <div>
              <span>Afternoon</span>

              <div>
                <i style={{ width: '68%' }} />
              </div>

              <strong>68%</strong>
            </div>

            <div>
              <span>Evening</span>

              <div>
                <i style={{ width: '48%' }} />
              </div>

              <strong>48%</strong>
            </div>
          </div>
        </div>

        <div className="planner-ai-card">
          <div className="planner-ai-orb">
            <BrainCircuit size={23} />
          </div>

          <div>
            <SectionKicker>
              AI RECOMMENDATION
            </SectionKicker>

            <h3>
              Keep the next block distraction-free.
            </h3>

            <p>
              Your schedule has enough recovery space.
              Protect the highest-value work instead of
              adding more tasks.
            </p>
          </div>
        </div>
      </div>

      {showTaskModal && (
        <div
          className="planner-task-modal-overlay"
          onMouseDown={() =>
            setShowTaskModal(false)
          }
        >
          <div
            className="planner-task-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="planner-modal-close"
              type="button"
              onClick={() =>
                setShowTaskModal(false)
              }
            >
              <X size={19} />
            </button>

            <div className="planner-modal-top">
              <div className="planner-modal-icon">
                <CalendarDays size={23} />
              </div>

              <span className="planner-modal-live">
                <i />
                READY
              </span>
            </div>

            <SectionKicker>
              NEW EXECUTION BLOCK
            </SectionKicker>

            <h2>Design your next move.</h2>

            <p>
              Add a focused block to your day. LifeOS
              will place it into your execution timeline.
            </p>

            <label>
              Task name

              <input
                autoFocus
                value={newTask.title}
                onChange={(event) =>
                  setNewTask({
                    ...newTask,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. Build landing page"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    createTask()
                  }
                }}
              />
            </label>

            <div className="planner-modal-grid">
              <label>
                Start time

                <input
                  type="time"
                  value={newTask.time}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      time: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Duration

                <select
                  value={newTask.duration}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      duration:
                        event.target.value,
                    })
                  }
                >
                  <option>30 min</option>
                  <option>45 min</option>
                  <option>60 min</option>
                  <option>90 min</option>
                  <option>120 min</option>
                </select>
              </label>
            </div>

            <div className="planner-modal-grid">
              <label>
                Mode

                <select
                  value={newTask.type}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      type: event.target.value,
                    })
                  }
                >
                  <option value="focus">
                    Focus
                  </option>

                  <option value="ai">
                    AI System
                  </option>

                  <option value="learn">
                    Learning
                  </option>

                  <option value="review">
                    Reflection
                  </option>
                </select>
              </label>

              <label>
                Priority

                <select
                  value={newTask.priority}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      priority:
                        event.target.value,
                    })
                  }
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </label>
            </div>

            <button
              className="planner-create-task-button"
              type="button"
              onClick={createTask}
              disabled={!newTask.title.trim()}
            >
              <Sparkles size={17} />
              Create task
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
function FinanceDashboard() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeos-transactions')

      return saved
        ? JSON.parse(saved)
        : [
          {
            id: 1,
            name: 'Netflix',
            amount: -649,
            category: 'Entertainment',
          },
          {
            id: 2,
            name: 'Amazon',
            amount: -1299,
            category: 'Shopping',
          },
          {
            id: 3,
            name: 'Salary',
            amount: 85000,
            category: 'Income',
          },
          {
            id: 4,
            name: 'Swiggy',
            amount: -438,
            category: 'Food',
          },
        ]
    } catch {
      return []
    }
  })

  const [showTransactionModal, setShowTransactionModal] =
    useState(false)


  const [showFinancialAnalysis, setShowFinancialAnalysis] = useState(false)
  const [transactionType, setTransactionType] =
    useState('expense')

  const [transactionForm, setTransactionForm] = useState({
    name: '',
    amount: '',
    category: 'Shopping',
  })

  useEffect(() => {
    localStorage.setItem(
      'lifeos-transactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  /* ================= FINANCIAL CALCULATIONS ================= */

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    )

  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce(
      (total, transaction) =>
        total + Math.abs(Number(transaction.amount)),
      0
    )

  const balance = income - expenses

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.amount < 0
  )

  const spendingByCategory = expenseTransactions.reduce(
    (groups, transaction) => {
      const category = transaction.category || 'Other'

      groups[category] =
        (groups[category] || 0) +
        Math.abs(Number(transaction.amount))

      return groups
    },
    {}
  )

  const spendingCategories = Object.entries(
    spendingByCategory
  ).sort(([, first], [, second]) => second - first)

  const maxCategorySpend =
    spendingCategories.length > 0
      ? spendingCategories[0][1]
      : 0

  const topSpendingCategory =
    spendingCategories.length > 0
      ? spendingCategories[0][0]
      : 'No spending'

  const topSpendingAmount =
    spendingCategories.length > 0
      ? spendingCategories[0][1]
      : 0

  const categoryCount = spendingCategories.length

  const spendingRatio =
    income > 0
      ? Math.round((expenses / income) * 100)
      : 0

  const averageExpense =
    expenseTransactions.length > 0
      ? Math.round(
        expenses / expenseTransactions.length
      )
      : 0

  const savings =
    income > 0
      ? Math.max(0, balance)
      : 0

  const savingsRate =
    income > 0
      ? Math.round((savings / income) * 100)
      : 0

  const formatCurrency = (value) =>
    `₹${Math.abs(Number(value) || 0).toLocaleString('en-IN')}`

  /* ================= TRANSACTION ACTIONS ================= */

  const openTransactionModal = () => {
    setTransactionForm({
      name: '',
      amount: '',
      category:
        transactionType === 'income'
          ? 'Income'
          : 'Shopping',
    })

    setShowTransactionModal(true)
  }

  const closeTransactionModal = () => {
    setShowTransactionModal(false)
  }

  const createTransaction = () => {
    const name = transactionForm.name.trim()

    const numericAmount = Number(
      String(transactionForm.amount).replace(/,/g, '')
    )

    if (!name) {
      window.alert(
        'Please enter a transaction name.'
      )
      return
    }

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      window.alert(
        'Please enter a valid amount.'
      )
      return
    }

    const finalAmount =
      transactionType === 'income'
        ? numericAmount
        : -numericAmount

    setTransactions((previous) => [
      {
        id: Date.now(),
        name,
        amount: finalAmount,
        category:
          transactionForm.category.trim() ||
          'Other',
      },
      ...previous,
    ])

    setTransactionForm({
      name: '',
      amount: '',
      category:
        transactionType === 'income'
          ? 'Income'
          : 'Shopping',
    })

    setShowTransactionModal(false)
  }

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter(
        (transaction) =>
          transaction.id !== id
      )
    )
  }

  /* ================= FINANCE DASHBOARD ================= */

  return (
    <section className="finance-dashboard">

      {/* ================================================= */}
      {/* FINANCE HEADER */}
      {/* ================================================= */}

      <div className="finance-heading">

        <div>
          <SectionKicker>
            FINANCIAL CONTROL
          </SectionKicker>

          <h2>
            Know where your money is going.
          </h2>

          <p>
            Track spending, understand patterns and
            make smarter decisions.
          </p>
        </div>

        <button
          className="primary-button finance-add-button"
          type="button"
          onClick={openTransactionModal}
        >
          <WalletCards size={18} />

          Add transaction

          <ArrowUpRight size={16} />
        </button>

      </div>


      {/* ================================================= */}
      {/* FINANCE OVERVIEW */}
      {/* ================================================= */}

      <div className="finance-grid">

        {/* BALANCE */}

        <div className="balance-card">

          <div className="finance-core-visual">
            <LifeCore3D mode="Finance" />
          </div>

          <span>
            TOTAL BALANCE
          </span>

          <strong>
            {formatCurrency(balance)}
          </strong>

          <div className="balance-change">
            <TrendingUp size={15} />
            +12.8% this month
          </div>

          <div className="finance-chart">

            {[35, 48, 42, 65, 58, 78, 92].map(
              (height, index) => (
                <span
                  key={index}
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}

          </div>

        </div>


        {/* INCOME */}

        <div className="money-stat income-stat">

          <CircleDollarSign size={20} />

          <span>
            Income
          </span>

          <strong>
            {formatCurrency(income)}
          </strong>

          <small>
            +8.4%
          </small>

        </div>


        {/* EXPENSE */}

        <div className="money-stat expense-stat">

          <WalletCards size={20} />

          <span>
            Expenses
          </span>

          <strong>
            {formatCurrency(expenses)}
          </strong>

          <small>
            −4.2%
          </small>

        </div>

      </div>


      {/* ================================================= */}
      {/* FINANCE COMMAND CENTER */}
      {/* ================================================= */}

      <div className="finance-command-grid">

        {/* ================================================= */}
        {/* LIVE MONEY FLOW */}
        {/* ================================================= */}

        <div className="finance-transactions-panel">

          <div className="finance-panel-header">

            <div>

              <SectionKicker>
                LIVE MONEY FLOW
              </SectionKicker>

              <h3>
                Transaction command
              </h3>

              <p>
                Every movement, tracked inside your
                financial system.
              </p>

            </div>

            <span className="finance-record-badge">
              {transactions.length} RECORDS
            </span>

          </div>


          <div className="finance-transaction-stack">

            {transactions.length === 0 ? (

              <div className="finance-empty-state">

                <WalletCards size={25} />

                <strong>
                  No transactions yet
                </strong>

                <span>
                  Add your first transaction to
                  activate money tracking.
                </span>

                <button
                  type="button"
                  onClick={openTransactionModal}
                >
                  <Plus size={15} />
                  Add transaction
                </button>

              </div>

            ) : (

              transactions.map(
                (transaction, index) => (

                  <div
                    className="finance-flow-row"
                    key={transaction.id}
                  >

                    <div className="finance-flow-index">
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </div>


                    <div
                      className={`finance-flow-icon ${transaction.amount > 0
                        ? 'flow-income'
                        : 'flow-expense'
                        }`}
                    >
                      {transaction.amount > 0 ? (
                        <TrendingUp size={16} />
                      ) : (
                        <WalletCards size={16} />
                      )}
                    </div>


                    <div className="finance-flow-info">

                      <strong>
                        {transaction.name}
                      </strong>

                      <span>
                        {transaction.category}
                      </span>

                    </div>


                    <div
                      className={`finance-flow-amount ${transaction.amount > 0
                        ? 'flow-positive'
                        : 'flow-negative'
                        }`}
                    >
                      {transaction.amount > 0
                        ? '+'
                        : '-'}

                      {formatCurrency(
                        Math.abs(
                          transaction.amount
                        )
                      )}
                    </div>


                    <button
                      type="button"
                      className="finance-flow-delete"
                      onClick={() =>
                        deleteTransaction(
                          transaction.id
                        )
                      }
                      aria-label={`Delete ${transaction.name}`}
                    >
                      <X size={14} />
                    </button>

                  </div>

                )
              )

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* FINANCIAL HEALTH */}
        {/* ================================================= */}

        <div className="finance-health-panel">

          <div className="finance-health-orbit">

            <div className="finance-health-ring ring-one" />

            <div className="finance-health-ring ring-two" />

            <div className="finance-health-core">

              <CircleDollarSign size={25} />

              <strong>
                {spendingRatio}%
              </strong>

              <span>
                OUTFLOW
              </span>

            </div>

          </div>


          <div className="finance-health-copy">

            <SectionKicker>
              FINANCIAL HEALTH
            </SectionKicker>

            <h3>
              {spendingRatio <= 30
                ? 'Cash flow is looking strong.'
                : spendingRatio <= 60
                  ? 'Your cash flow needs attention.'
                  : 'Spending is getting aggressive.'}
            </h3>

            <p>
              {income > 0
                ? `${formatCurrency(expenses)} of your recorded income is currently allocated to expenses.`
                : 'Add income and expenses to activate your financial health analysis.'}
            </p>


            <div className="finance-health-metrics">

              <div>

                <span>
                  NET POSITION
                </span>

                <strong>
                  {formatCurrency(balance)}
                </strong>

              </div>


              <div>

                <span>
                  AVG. EXPENSE
                </span>

                <strong>
                  {formatCurrency(
                    averageExpense
                  )}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SPENDING BREAKDOWN */}
        {/* ================================================= */}

        <div className="finance-breakdown-panel">

          <div className="finance-panel-header">

            <div>

              <SectionKicker>
                SPENDING MATRIX
              </SectionKicker>

              <h3>
                Where the money goes
              </h3>

              <p>
                Your strongest spending signals
                right now.
              </p>

            </div>


            <div className="finance-category-count">

              <strong>
                {categoryCount}
              </strong>

              <span>
                CATEGORIES
              </span>

            </div>

          </div>


          <div className="finance-breakdown-list">

            {spendingCategories.length === 0 ? (

              <div className="finance-breakdown-empty">
                No expense data available yet.
              </div>

            ) : (

              spendingCategories.map(
                ([category, amount], index) => {

                  const percentage =
                    expenses > 0
                      ? Math.round(
                        (amount / expenses) *
                        100
                      )
                      : 0

                  const width =
                    maxCategorySpend > 0
                      ? Math.round(
                        (amount /
                          maxCategorySpend) *
                        100
                      )
                      : 0

                  return (
                    <div
                      className="finance-breakdown-row"
                      key={category}
                    >

                      <div className="finance-breakdown-meta">

                        <div>

                          <span>
                            {String(
                              index + 1
                            ).padStart(2, '0')}
                          </span>

                          <strong>
                            {category}
                          </strong>

                        </div>

                        <b>
                          {formatCurrency(amount)}
                        </b>

                      </div>


                      <div className="finance-breakdown-track">

                        <i
                          style={{
                            width: `${width}%`,
                          }}
                        />

                      </div>


                      <div className="finance-breakdown-foot">

                        <span>
                          {percentage}% OF EXPENSES
                        </span>

                        <span>
                          {index === 0
                            ? 'PRIMARY SIGNAL'
                            : 'ACTIVE'}
                        </span>

                      </div>

                    </div>
                  )
                }
              )

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* AI MONEY COPILOT */}
        {/* ================================================= */}

        <div className="finance-copilot-panel">

          <div className="finance-copilot-glow" />

          <div className="finance-copilot-icon">
            <BrainCircuit size={23} />
          </div>

          <SectionKicker>
            AI MONEY COPILOT
          </SectionKicker>

          <h3>
            {topSpendingCategory ===
              'No spending'
              ? 'Give your money a signal.'
              : `Your biggest signal is ${topSpendingCategory}.`}
          </h3>

          <p>
            {income > 0
              ? `Your largest spending area is ${topSpendingCategory}, using ${formatCurrency(topSpendingAmount)} of your recorded outflow.`
              : 'Add financial activity and LifeOS will start finding useful patterns.'}
          </p>


          <div className="finance-copilot-stats">

            <div>

              <span>
                OUTFLOW
              </span>

              <strong>
                {formatCurrency(expenses)}
              </strong>

            </div>


            <div>

              <span>
                EFFICIENCY
              </span>

              <strong>
                {Math.max(
                  0,
                  100 - spendingRatio
                )}%
              </strong>

            </div>

          </div>


          <button
            className="finance-copilot-button"
            type="button"
            onClick={() =>
              window.alert(
                `Top spending: ${topSpendingCategory}\n` +
                `Amount: ${formatCurrency(topSpendingAmount)}\n` +
                `Total expenses: ${formatCurrency(expenses)}\n` +
                `Income: ${formatCurrency(income)}\n` +
                `Balance: ${formatCurrency(balance)}\n` +
                `Savings rate: ${savingsRate}%`
              )
            }
          >
            <Sparkles size={15} />

            Run financial analysis

            <ArrowUpRight size={15} />
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* FINANCIAL SNAPSHOT */}
      {/* ================================================= */}

      <div className="finance-category-grid">

        <div className="finance-category-card">

          <span>
            SAVINGS RATE
          </span>

          <strong>
            {savingsRate}%
          </strong>

          <small>
            {savingsRate >= 50
              ? 'Excellent saving momentum'
              : savingsRate >= 30
                ? 'Healthy saving momentum'
                : 'Increase your savings buffer'}
          </small>

        </div>


        <div className="finance-category-card">

          <span>
            TOP SPENDING
          </span>

          <strong>
            {topSpendingCategory}
          </strong>

          <small>
            {formatCurrency(
              topSpendingAmount
            )}{' '}
            recorded outflow
          </small>

        </div>


        <div className="finance-category-card">

          <span>
            TRANSACTION COUNT
          </span>

          <strong>
            {String(
              transactions.length
            ).padStart(2, '0')}
          </strong>

          <small>
            Active financial records
          </small>

        </div>


        <div className="finance-category-card">

          <span>
            NET POSITION
          </span>

          <strong>
            {formatCurrency(balance)}
          </strong>

          <small>
            Current recorded balance
          </small>

        </div>

      </div>


      {/* ================================================= */}
      {/* RECENT ACTIVITY + AI INSIGHT */}
      {/* ================================================= */}

      <div className="finance-lower-grid">

        {/* TRANSACTIONS */}

        <div className="transactions-card">

          <div className="transactions-header">

            <div>

              <SectionKicker>
                RECENT ACTIVITY
              </SectionKicker>

              <h3>
                Transactions
              </h3>

            </div>

            <span className="view-all">
              {transactions.length} records
            </span>

          </div>


          <div className="transaction-list">

            {transactions.length === 0 ? (

              <div className="finance-empty-state">

                <WalletCards size={24} />

                <strong>
                  No transactions yet
                </strong>

                <span>
                  Add your first transaction
                  to start tracking.
                </span>

                <button
                  type="button"
                  onClick={openTransactionModal}
                >
                  <Plus size={15} />
                  Add transaction
                </button>

              </div>

            ) : (

              transactions.map(
                (transaction) => (

                  <div
                    className="transaction-row"
                    key={transaction.id}
                  >

                    <div className="transaction-main">

                      <div
                        className={`transaction-icon ${transaction.amount > 0
                          ? 'transaction-income-icon'
                          : 'transaction-expense-icon'
                          }`}
                      >
                        {transaction.amount > 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <WalletCards size={16} />
                        )}
                      </div>


                      <div>

                        <strong>
                          {transaction.name}
                        </strong>

                        <span>
                          {transaction.category}
                        </span>

                      </div>

                    </div>


                    <div className="transaction-value">

                      <b
                        className={
                          transaction.amount > 0
                            ? 'positive'
                            : ''
                        }
                      >
                        {transaction.amount > 0
                          ? '+'
                          : '-'}

                        {formatCurrency(
                          Math.abs(
                            transaction.amount
                          )
                        )}
                      </b>


                      <button
                        type="button"
                        className="transaction-delete"
                        onClick={() =>
                          deleteTransaction(
                            transaction.id
                          )
                        }
                        aria-label={`Delete ${transaction.name}`}
                      >
                        <X size={13} />
                      </button>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        {/* AI INSIGHT */}

        <div className="finance-ai-card">

          <div className="finance-ai-icon">
            <BrainCircuit size={22} />
          </div>

          <SectionKicker>
            AI FINANCIAL INSIGHT
          </SectionKicker>

          <h3>
            {spendingRatio > 50
              ? 'Watch your spending.'
              : 'Your spending is under control.'}
          </h3>

          <p>
            {income === 0
              ? 'Add your income and expenses to unlock personalized financial insights.'
              : spendingRatio > 50
                ? `You are using ${spendingRatio}% of your recorded income. Review your largest spending categories.`
                : `Only ${spendingRatio}% of your recorded income is currently going toward expenses. Your cash flow looks healthy.`}
          </p>


          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              window.alert(
                `Income: ${formatCurrency(income)}\n` +
                `Expenses: ${formatCurrency(expenses)}\n` +
                `Balance: ${formatCurrency(balance)}\n` +
                `Savings rate: ${savingsRate}%`
              )
            }
          >
            Analyze spending

            <ArrowUpRight size={15} />
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* ADD TRANSACTION MODAL */}
      {/* ================================================= */}

      {showTransactionModal && (

        <div
          className="finance-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeTransactionModal()
            }
          }}
        >

          <div className="finance-transaction-modal">

            {/* AURORA */}

            <div className="finance-modal-aurora aurora-one" />
            <div className="finance-modal-aurora aurora-two" />
            <div className="finance-modal-aurora aurora-three" />


            {/* HEADER */}

            <div className="finance-modal-header">

              <div className="finance-modal-title-wrap">

                <div className="finance-modal-icon">
                  <WalletCards size={21} />
                </div>

                <div>

                  <SectionKicker>
                    FINANCE CONTROL
                  </SectionKicker>

                  <h3>
                    Add transaction
                  </h3>

                  <p>
                    Record money entering or
                    leaving your system.
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="finance-modal-close"
                onClick={closeTransactionModal}
                aria-label="Close transaction modal"
              >
                <X size={18} />
              </button>

            </div>


            {/* TYPE SELECTOR */}

            <div className="finance-type-selector">

              <button
                type="button"
                className={
                  transactionType ===
                    'expense'
                    ? 'active expense-mode'
                    : ''
                }
                onClick={() => {
                  setTransactionType(
                    'expense'
                  )

                  setTransactionForm(
                    (previous) => ({
                      ...previous,
                      category:
                        'Shopping',
                    })
                  )
                }}
              >

                <WalletCards size={17} />

                <span>
                  Expense
                </span>

                <small>
                  Money out
                </small>

              </button>


              <button
                type="button"
                className={
                  transactionType ===
                    'income'
                    ? 'active income-mode'
                    : ''
                }
                onClick={() => {
                  setTransactionType(
                    'income'
                  )

                  setTransactionForm(
                    (previous) => ({
                      ...previous,
                      category:
                        'Income',
                    })
                  )
                }}
              >

                <TrendingUp size={17} />

                <span>
                  Income
                </span>

                <small>
                  Money in
                </small>

              </button>

            </div>


            {/* FORM */}

            <div className="finance-form-grid">

              <label className="finance-field finance-field-wide">

                <span>
                  TRANSACTION NAME
                </span>

                <div className="finance-input-shell">

                  <Sparkles size={16} />

                  <input
                    type="text"
                    value={
                      transactionForm.name
                    }
                    onChange={(event) =>
                      setTransactionForm(
                        (previous) => ({
                          ...previous,
                          name:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="e.g. Amazon, Salary, Rent"
                    autoFocus
                  />

                </div>

              </label>


              <label className="finance-field">

                <span>
                  AMOUNT
                </span>

                <div className="finance-input-shell amount-shell">

                  <b>
                    ₹
                  </b>

                  <input
                    type="number"
                    min="1"
                    value={
                      transactionForm.amount
                    }
                    onChange={(event) =>
                      setTransactionForm(
                        (previous) => ({
                          ...previous,
                          amount:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="0"
                  />

                </div>

              </label>


              <label className="finance-field">

                <span>
                  CATEGORY
                </span>

                <div className="finance-input-shell">

                  <WalletCards size={16} />

                  <select
                    value={
                      transactionForm.category
                    }
                    onChange={(event) =>
                      setTransactionForm(
                        (previous) => ({
                          ...previous,
                          category:
                            event.target
                              .value,
                        })
                      )
                    }
                  >

                    <option>
                      Food
                    </option>

                    <option>
                      Shopping
                    </option>

                    <option>
                      Entertainment
                    </option>

                    <option>
                      Bills
                    </option>

                    <option>
                      Transport
                    </option>

                    <option>
                      Health
                    </option>

                    <option>
                      Learning
                    </option>

                    <option>
                      Income
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>

              </label>

            </div>


            {/* LIVE PREVIEW */}

            <div
              className={`finance-transaction-preview ${transactionType === 'income'
                ? 'preview-income'
                : 'preview-expense'
                }`}
            >

              <div>

                <span>
                  LIVE PREVIEW
                </span>

                <strong>
                  {transactionForm.name.trim()
                    ? transactionForm.name
                    : 'Your transaction'}
                </strong>

                <small>
                  {transactionForm.category}
                </small>

              </div>


              <b>

                {transactionType ===
                  'income'
                  ? '+'
                  : '-'}

                ₹

                {Number(
                  String(
                    transactionForm.amount ||
                    0
                  ).replace(/,/g, '')
                ).toLocaleString(
                  'en-IN'
                )}

              </b>

            </div>


            {/* ACTIONS */}

            <div className="finance-modal-actions">

              <button
                type="button"
                className="finance-cancel-button"
                onClick={closeTransactionModal}
              >
                Cancel
              </button>


              <button
                type="button"
                className="finance-create-button"
                onClick={createTransaction}
              >

                <Sparkles size={16} />

                {transactionType ===
                  'income'
                  ? 'Add income'
                  : 'Add expense'}

                <ArrowUpRight size={16} />

              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}
function formatAIMessage(text) {
  return text.split('\n').map((line, index) => {
    const parts = line.split(/(\*\*.*?\*\*)/g)

    return (
      <div key={index} className="ai-formatted-line">
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIndex}>
                {part.slice(2, -2)}
              </strong>
            )
          }

          return <span key={partIndex}>{part}</span>
        })}
      </div>
    )
  })
}

function AIAssistantDashboard({
  messages,
  input,
  setInput,
  loading,
  sendMessage,
}) {
  const [isListening, setIsListening] = useState(false)

  const recognitionRef = useRef(null)
  const silenceTimerRef = useRef(null)
  const finalTranscriptRef = useRef('')

  const [speechSupported] = useState(
    'SpeechRecognition' in window ||
    'webkitSpeechRecognition' in window
  )

  const stopListening = () => {
    clearTimeout(silenceTimerRef.current)

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    setIsListening(false)
  }

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current)

    silenceTimerRef.current = setTimeout(() => {
      stopListening()
    }, 5000)
  }

  const startListening = () => {
    if (!speechSupported) {
      window.alert(
        'Voice input is not supported in this browser.'
      )
      return
    }

    // If already listening, clicking the mic stops it.
    if (isListening) {
      stopListening()
      return
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()

    recognitionRef.current = recognition

    recognition.lang = 'en-IN'
    recognition.continuous = true
    recognition.interimResults = true

    finalTranscriptRef.current = input || ''

    recognition.onstart = () => {
      setIsListening(true)
      resetSilenceTimer()
    }

    recognition.onresult = (event) => {
      let finalTranscript = finalTranscriptRef.current
      let interimTranscript = ''

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript =
          event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      finalTranscriptRef.current = finalTranscript

      setInput(
        `${finalTranscript}${interimTranscript}`.trim()
      )

      resetSilenceTimer()
    }

    recognition.onerror = (event) => {
      console.log('🎙️ VOICE ERROR:', event.error)

      clearTimeout(silenceTimerRef.current)
      setIsListening(false)
    }

    recognition.onend = () => {
      clearTimeout(silenceTimerRef.current)
      setIsListening(false)
      recognitionRef.current = null
    }

    recognition.start()
  }

  useEffect(() => {
    return () => {
      clearTimeout(silenceTimerRef.current)

      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const suggestions = [
    'Plan my day',
    'Help me reach my goals',
    'Analyze my productivity',
    'Create a better routine',
  ]

  return (
    <section className="ai-dashboard">
      <div className="ai-dashboard-header">
        <div>
          <SectionKicker>
            PERSONAL AI SYSTEM
          </SectionKicker>

          <h1>
            Talk to your <span>LifeOS.</span>
          </h1>

          <p>
            Your intelligent companion for goals,
            planning, habits and everyday decisions.
          </p>
        </div>

        <div className="ai-status">
          <span className="pulse-dot" />
          AI online
        </div>
      </div>

      <div className="ai-dashboard-grid">
        <div className="ai-visual-card">
          <div className="ai-visual-label">
            <span>NEURAL CORE</span>
            <small>ACTIVE</small>
          </div>

          <div className="ai-core-stage">
            <LifeCore3D mode="AI Assistant" />
          </div>

          <div className="ai-visual-footer">
            <div>
              <span>INTELLIGENCE</span>
              <strong>Adaptive</strong>
            </div>

            <div>
              <span>CONTEXT</span>
              <strong>LifeOS</strong>
            </div>
          </div>
        </div>

        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div>
              <span className="chat-title">
                LifeOS AI
              </span>

              <span className="chat-subtitle">
                Your personal intelligence layer
              </span>
            </div>

            <div className="chat-live">
              <span className="pulse-dot" />
              Live
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="ai-avatar">
                    ✦
                  </div>
                )}

                <div className="ai-message-bubble">
                  {formatAIMessage(message.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant">
                <div className="ai-avatar">
                  ✦
                </div>

                <div className="ai-message-bubble typing-bubble">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="ai-input-area">
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey
                ) {
                  event.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask LifeOS anything..."
              disabled={loading}
            />

            <button
              type="button"
              className={`ai-voice-button ${isListening ? 'listening' : ''
                }`}
              onClick={startListening}
              disabled={
                loading || !speechSupported
              }
              title={
                isListening
                  ? 'Stop listening'
                  : 'Start voice input'
              }
              aria-label={
                isListening
                  ? 'Stop voice input'
                  : 'Start voice input'
              }
            >
              {isListening ? (
                <Square size={16} />
              ) : (
                <Mic size={18} />
              )}
            </button>

            <button
              type="button"
              className="ai-send-button"
              onClick={sendMessage}
              disabled={
                loading || !input.trim()
              }
            >
              {loading ? (
                '...'
              ) : (
                <Send size={17} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function GoalModal({
  newGoal,
  setNewGoal,
  onClose,
  onCreate,
}) {
  return (
    <div className="goal-modal-overlay" onMouseDown={onClose}>
      <div
        className="goal-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="goal-modal-close" onClick={onClose}>
          <X size={19} />
        </button>

        <div className="goal-modal-top-row">
          <div className="goal-modal-icon">
            <Crosshair size={25} />
          </div>
          <span className="goal-modal-live"><span /> READY</span>
        </div>

        <SectionKicker>NEW OBJECTIVE</SectionKicker>

        <h2>Create something worth chasing.</h2>

        <p className="goal-modal-description">
          Define the target. LifeOS will help you turn it into momentum.
        </p>

        <label>
          Goal name
          <input
            autoFocus
            value={newGoal.name}
            onChange={(event) =>
              setNewGoal({
                ...newGoal,
                name: event.target.value,
              })
            }
            placeholder="e.g. Launch my startup"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onCreate()
              }
            }}
          />
        </label>

        <div className="goal-modal-two-col">
          <label>
            Category
            <select
              value={newGoal.category}
              onChange={(event) =>
                setNewGoal({
                  ...newGoal,
                  category: event.target.value,
                })
              }
            >
              <option>Personal</option>
              <option>Career</option>
              <option>Health</option>
              <option>Finance</option>
              <option>Learning</option>
            </select>
          </label>

          <label>
            Priority
            <select
              value={newGoal.priority}
              onChange={(event) =>
                setNewGoal({
                  ...newGoal,
                  priority: event.target.value,
                })
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
        </div>

        <label className="goal-date-field">
          Target date

          <div className="goal-date-input-wrap">
            <CalendarDays size={17} />

            <input
              type="date"
              value={newGoal.deadline}
              onChange={(event) =>
                setNewGoal({
                  ...newGoal,
                  deadline: event.target.value,
                })
              }
            />
          </div>
        </label>

        <button
          className="goal-create-button"
          onClick={onCreate}
          disabled={!newGoal.name.trim()}
        >
          <Sparkles size={18} />
          Create goal
          <ArrowUpRight size={17} />
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState('Overview')
  const [authenticated, setAuthenticated] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (mounted) {
        setAuthenticated(!!data.session)
        setAuthChecking(false)
      }
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthenticated(!!session)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(
    localStorage.getItem('lifeos-theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme
    )

    localStorage.setItem('lifeos-theme', theme)
  }, [theme])

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! I’m LifeOS AI. I can help you plan goals, organize tasks, build habits, manage time, or think through finances. What would you like to work on today?',
    },
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const [showGoalModal, setShowGoalModal] = useState(false)

  const [newGoal, setNewGoal] = useState({
    name: '',
    category: 'Personal',
    deadline: '',
    priority: 'Medium',
  })

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeos-goals')
      return saved ? JSON.parse(saved) : defaultGoals
    } catch {
      return defaultGoals
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'lifeos-goals',
      JSON.stringify(goals)
    )
  }, [goals])

  const sendMessage = async () => {
    const message = input.trim()

    if (!message || loading) return

    setMessages((previous) => [
      ...previous,
      {
        role: 'user',
        content: message,
      },
    ])

    setInput('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:3001/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'AI request failed'
        )
      }

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: data.reply,
        },
      ])
    } catch (error) {
      console.error(error)

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            'I couldn’t connect to the LifeOS AI server. Please make sure the backend is running on port 3001.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const createGoal = () => {
    const name = newGoal.name.trim()

    if (!name) return

    const goal = {
      id: Date.now(),
      name,
      category: newGoal.category,
      progress: 0,
      status: 'Just started',
      priority: newGoal.priority,
      deadline: newGoal.deadline,
    }

    setGoals((previous) => [
      goal,
      ...previous,
    ])

    setShowGoalModal(false)

    setNewGoal({
      name: '',
      category: 'Personal',
      deadline: '',
      priority: 'Medium',
    })
  }

  const updateGoal = (id, changes) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
            ...goal,
            ...changes,
          }
          : goal
      )
    )
  }

  const deleteGoal = (id) => {
    setGoals((previous) =>
      previous.filter(
        (goal) => goal.id !== id
      )
    )
  }

  const handleNavigation = (label) => {
    setActive(label)
    setMenuOpen(false)
  }
  if (authChecking) {
    return null
  }

  if (!authenticated) {
    return (
      <AuthScreen
        onLogin={() => {
          localStorage.setItem('lifeos-auth', 'true')
          setAuthenticated(true)
        }}
      />
    )
  }
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <aside
        className={`sidebar ${menuOpen ? 'open' : ''
          }`}
      >
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={23} />
          </div>

          <div>
            <strong>LifeOS</strong>
            <span>AI SYSTEM</span>
          </div>
        </div>

        <div className="system-status">
          <span className="pulse-dot" />
          <span>System online</span>
          <b>99.9%</b>
        </div>

        <div className="nav-heading">
          COMMAND CENTER
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.label}
                className={`nav-item ${active === item.label
                  ? 'active'
                  : ''
                  }`}
                onClick={() =>
                  handleNavigation(item.label)
                }
                style={{
                  '--nav-color': item.color,
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>

                {active === item.label && (
                  <ChevronRight size={16} />
                )}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div
            className="sidebar-ai-card"
            onClick={() => setActive('AI Assistant')}
          >
            <div className="sidebar-ai-icon">
              <BrainCircuit size={20} />
            </div>

            <div>
              <strong>AI Core</strong>
              <span>
                Learning your patterns
              </span>
            </div>
          </div>

          <div className="sidebar-profile">
            <div className="profile-avatar">
              S
            </div>

            <div>
              <strong>Welcome back</strong>
              <span>
                Personal workspace
              </span>
            </div>
            <button
              type="button"
              className="logout-button"
              onClick={async () => {
                const { error } = await supabase.auth.signOut()

                if (error) {
                  window.alert(error.message)
                }
              }}
            >
              Logout
            </button>
            <button
              type="button"
              className="theme-toggle-button"
              onClick={() =>
                setTheme((current) =>
                  current === 'dark' ? 'light' : 'dark'
                )
              }
              aria-label={
                theme === 'dark'
                  ? 'Switch to bright theme'
                  : 'Switch to dark theme'
              }
            >
              {theme === 'dark' ? (
                <Moon size={17} />
              ) : (
                <Sun size={17} />
              )}
            </button>
          </div>
        </div>
      </aside>

      <button
        className="mobile-menu-button"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <main className="main-content">
        <header className="top-header">
          <div className="breadcrumb">
            <span>LifeOS</span>
            <ChevronRight size={14} />
            <strong>{active}</strong>
          </div>

          <div className="top-actions">
            <button
              className="notification-button"
              aria-label="Messages"
              onClick={() =>
                setActive('AI Assistant')
              }
            >
              <MessageSquare size={18} />
              <span />
            </button>

            <div className="top-avatar">
              S
            </div>
          </div>
        </header>

        {active === 'AI Assistant' ? (
          <AIAssistantDashboard
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            sendMessage={sendMessage}
          />
        ) : active === 'Goals' ? (
          <GoalsDashboard
            goals={goals}
            onAddGoal={() =>
              setShowGoalModal(true)
            }
            onUpdateGoal={updateGoal}
            onDeleteGoal={deleteGoal}
          />
        ) : active === 'Planner' ? (
          <PlannerDashboard />
        ) : active === 'Finance' ? (
          <FinanceDashboard />
        ) : (
          <OverviewDashboard
            setActive={setActive}
          />
        )}
      </main>

      {showGoalModal && (
        <GoalModal
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          onClose={() =>
            setShowGoalModal(false)
          }
          onCreate={createGoal}
        />
      )}
    </div>
  )
}
