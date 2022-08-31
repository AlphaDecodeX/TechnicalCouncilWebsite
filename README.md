			+--------------------+
			|        CS 301      |
			| PROJECT 1: THREADS |
			|   DESIGN DOCUMENT  |
			+--------------------+
				   
---- GROUP ----

>> Fill in the names and email addresses of your group members.

Lovepreet Singh lovepreet.singh@iitgn.ac.in
Taha Mohammad Syed mohammad.syed@iitgn.ac.in
Vaibhav Khandare dilip.khandare@iitgn.ac.in

---- PRELIMINARIES ----

>> If you have any preliminary comments on your submission, notes for the
>> TAs, or extra credit, please give them here.

>> Please cite any offline or online sources you consulted while
>> preparing your submission, other than the Pintos documentation, course
>> text, lecture notes, and course staff.

			     ALARM CLOCK
			     ===========

---- DATA STRUCTURES ----

>> A1: Copy here the declaration of each new or changed `struct' or
>> `struct' member, global or static variable, `typedef', or
>> enumeration.  Identify the purpose of each in 25 words or less.

<waketick> has been defined to store the time after which it should be woken up.
<list_insert_ordered> Data Structure used to store thread element in the sleep list according the the <cmp_waketick> comparator.
<cmp_waketick> compares the wakeup time and inserts in the list accordingly.

---- ALGORITHMS ----

>> A2: Briefly describe what happens in a call to timer_sleep(),
>> including the effects of the timer interrupt handler.

In timer_sleep() -->
  
  - Current Thread's <wakeuptick> is set to the given sleep ticks plus the 
    current ticks
  - Disable interrupts
  - Thread is inserted in the <sleep_list> according to the <wakeuptick> comparator <cmp_waketick>
  - Block the thread
  - Make the interrupt level to the previous level.

In timer_interrupt() -->
  - Loop through the Linked List i.e. sleep_list
  - Wake up the thread which has completed its waketick
  - Disable interrupts
  - Remove it from <sleep_list>
  - Unblock the thread and make interrupts to the old one.

>> A3: What steps are taken to minimize the amount of time spent in
>> the timer interrupt handler?

Sleeping list is sorted by the wakeup ticks time which make sure that we do need to check only from the front and can stop whenever wakeup time > ticks and no need to check further.

---- SYNCHRONIZATION ----

>> A4: How are race conditions avoided when multiple threads call
>> timer_sleep() simultaneously?

Race condition arises when system attempts to perform multiple operations at the same time. We did disabled the interrupts during operations on the list. So, Race condition has been avoided.

>> A5: How are race conditions avoided when a timer interrupt occurs
>> during a call to timer_sleep()?

The Interrupts are disabled

---- RATIONALE ----

>> A6: Why did you choose this design?  In what ways is it superior to
>> another design you considered?

Having a sleep_list make sure that we do minimum operations and interrupts disabled make sure we donot face race condition. We also tried locks implementation which makes alarm_simultaneous to fail. So, we choose the design of interrupts disabling. The design of using sleep_list and ready_list is too intuitive from the Threads/Process lifecycle i.e. Ready --> Running --> Wait --> Ready

			 PRIORITY SCHEDULING
			 ===================

---- DATA STRUCTURES ----

>> B1: Copy here the declaration of each new or changed `struct' or
>> `struct' member, global or static variable, `typedef', or
>> enumeration. Identify the purpose of each in 25 words or less.

- Added to struct thread
   int <basepriority>; int <priority>; struct list_elem <donorelem>; struct list <pot_donors> (Potential Donors);
   struct lock *<blocked>; (Which lock is blocking the current thread)


>> B2: Explain the data structure used to track priority donation.
>> Use ASCII art to diagram a nested donation.  (Alternately, submit a
>> .png file.)

---- ALGORITHMS ----

>> B3: How do you ensure that the highest priority thread waiting for
>> a lock, semaphore, or condition variable wakes up first?

>> B4: Describe the sequence of events when a call to lock_acquire()
>> causes a priority donation.  How is nested donation handled?

>> B5: Describe the sequence of events when lock_release() is called
>> on a lock that a higher-priority thread is waiting for.

---- SYNCHRONIZATION ----

>> B6: Describe a potential race in thread_set_priority() and explain
>> how your implementation avoids it.  Can you use a lock to avoid
>> this race?

---- RATIONALE ----

>> B7: Why did you choose this design?  In what ways is it superior to
>> another design you considered?

			  ADVANCED SCHEDULER
			  ==================

---- DATA STRUCTURES ----

>> C1: Copy here the declaration of each new or changed `struct' or
>> `struct' member, global or static variable, `typedef', or
>> enumeration.  Identify the purpose of each in 25 words or less.

---- ALGORITHMS ----

>> C2: Suppose threads A, B, and C have nice values 0, 1, and 2.  Each
>> has a recent_cpu value of 0.  Fill in the table below showing the
>> scheduling decision and the priority and recent_cpu values for each
>> thread after each given number of timer ticks:

timer  recent_cpu    priority   thread
ticks   A   B   C   A   B   C   to run
-----  --  --  --  --  --  --   ------
 0      0   0  0    63  61  59     A
 4	1.  0. 0    62. 61. 59.    A
 8.     2.  0. 0    61. 61. 59.    A
12.     3.  0. 0    60. 61. 59.    B
16.     3.  1. 0    60. 60. 59.    B
20.     3.  2. 0    60. 59. 59.    B
24
28
32
36

>> C3: Did any ambiguities in the scheduler specification make values
>> in the table uncertain?  If so, what rule did you use to resolve
>> them?  Does this match the behavior of your scheduler?

>> C4: How is the way you divided the cost of scheduling between code
>> inside and outside interrupt context likely to affect performance?

---- RATIONALE ----

>> C5: Briefly critique your design, pointing out advantages and
>> disadvantages in your design choices.  If you were to have extra
>> time to work on this part of the project, how might you choose to
>> refine or improve your design?

>> C6: The assignment explains arithmetic for fixed-point math in
>> detail, but it leaves it open to you to implement it.  Why did you
>> decide to implement it the way you did?  If you created an
>> abstraction layer for fixed-point math, that is, an abstract data
>> type and/or a set of functions or macros to manipulate fixed-point
>> numbers, why did you do so?  If not, why not?

			   SURVEY QUESTIONS
			   ================

Answering these questions is optional, but it will help us improve the
course in future quarters.  Feel free to tell us anything you
want--these questions are just to spur your thoughts.  You may also
choose to respond anonymously in the course evaluations at the end of
the quarter.

>> In your opinion, was this assignment, or any one of the three problems
>> in it, too easy or too hard?  Did it take too long or too little time?

>> Did you find that working on a particular part of the assignment gave
>> you greater insight into some aspect of OS design?

>> Is there some particular fact or hint we should give students in
>> future quarters to help them solve the problems?  Conversely, did you
>> find any of our guidance to be misleading?

>> Do you have any suggestions for the TAs to more effectively assist
>> students, either for future quarters or the remaining projects?

>> Any other comments?
