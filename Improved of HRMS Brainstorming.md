HRMS SYSTEM – TASK BREAKDOWN  
 Date: 15th Feb 2026  
 Module: System Admin & Company Management

1. **AUTHENTICATION & ACCESS CONTROL MODULE**

**1.1 Company Registration**

* Create a company registration with the following fields:

  * name  
  * sector  
  * tin  
  * logo\_url  
  * tel  
  * email  
  * uniquePassword  
  * status (active, suspended, inactive)

**1.2 Company Admin Registration**

* **Register the company admin with:**

  * firstname  
  * lastname  
  * phoneNumber  
  * email  
  * password  
  * companyId

* Send verification OTP to the email after registration

**1.3 Company User Login (Admin & Employee)**

* Login using:

  * email  
  * companyUniquePassword or password

* Verify OTP  
* Force the user to set a new password after OTP verification

1.4 Forgot Password Flow

* Send forgot password OTP via email  
* Verify OTP (email, otp)  
* Allow the user to set a new password

2. GLOBAL MASTER TABLES

**2.1 Department Table**

* id  
* name (unique)  
* registeredBy

**2.2 Employee Title(Position) Table**

* id  
* name (unique)  
* registeredBy

**2.3 Employee Table**

* id  
* firstName  
* lastName  
* ID\_number  
* phoneNumber  
* email  
* jobtitle\_id  
* department\_id

**2.4 Employment Status Table**

* id  
* employee\_id  
* company\_id  
* status (Pending, Active, Probation, Resigned, Terminated)

3. **COMPANY ADMIN MODULE**

**3.1 Department Management**

* Add new department

* Save in company\_department table with:

  * id

  * department\_id

  * company\_id

  * description

  * status

  * createdBy

**3.2 Job Title Management**

* Create job title under department with:

  * id

  * employeeTitle\_id(postion)

  * department\_id

  * description

  * status

**3.3 Company Settings**

* Adjust the company logo

* Change company's unique password

**3.4 Employee Assignment**

* Assign department to employee

* Assign job title to employee

4. **APPLICANTS MANAGEMENT MODULE**

**4.1 Applicant Table**

* id

* firstName

* lastName

* ID

* phoneNumber

* email

* application\_reference\_code

* jobTitle\_id

* status (pending, reviewed, interviewed, passed\_interview, failed\_interview, sat\_for\_exam, passed\_exam, failed\_exam, recruited, awaiting\_for\_recruitment, rejected)

* history (JSONB):

  * status

  * doneBy

  * doneAt

  * comment

---

5. **DOCUMENT MANAGEMENT MODULE**

**5.1 Employee Documents**

* id

* type (CV, ID, CONTRACT, CRIMINAL\_CERTIFICATE, MEDICAL\_REPORT, RESIGNATION\_LETTER, EXPERIENCE\_LETTER, CLEARENCE\_LETTER)

* status (active, replaced)

* employee\_id

Note: Optimize document storage and ensure company ownership validation.

**5.2 Applicant Documents**

* id

* type (same as employee document types)

* status (active, replaced)

* applicant\_id

Note: Optimize document handling strategy.

6. **COMPANY POLICY MODULE**

**6.1 Onboarding Policy**  
 **Required documents:**

* CV

* ID

* CONTRACT

* CRIMINAL\_CERTIFICATE

* MEDICAL\_REPORT

System must detect employees who do not meet onboarding policy requirements.

6.2 Offboarding Policy  
 Required documents:

* RESIGNATION\_LETTER

* EXPERIENCE\_LETTER

* CLEARENCE\_LETTER

System must detect employees who do not meet offboarding policy requirements.

---

7. INFRASTRUCTURE & DEPLOYMENT TASKS

7.1 Cloud & Storage

* Setup AWS S3 Bucket for storing employee, applicant, and company documents

7.2 Email Service

* Create HRMS Gmail account

* Configure email service for OTP sending

7.3 Infrastructure Setup

* Purchase domain name

* Setup SSL certificate

* Setup PostgreSQL database (AWS RDS)

* Setup application server (AWS EC2)

---

8. PROJECT MANAGEMENT

* Arrange weekly task planning

* Break tasks into weekly sprint goals

* Track progress per module

