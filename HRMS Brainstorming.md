**15th Feb 2026**  
**SYSTEM ADMIN**

- Register a new company (name, sector, tin, logo\_url, tel, email, uniquePassword, status(active, suspended, inactive))  
- Company admin registration (firstname, lastname, phoneNumber, email, password, companyId),   
  On Company admin registration, send verification otp to the email,

  On Company user (admin, employee) login,(email, companyUniquePassword/password)

  → Verify OTP  
  → Set own new password


- Forgot password: Send forgot password OTP via email,  
  → Verify OTP (email, otp)  
  → Set own new password

      
      
**Global tables,**  
department(id, name(unique), registeredBy)  
employeeTitle (id, name(unique), registeredBy)  
employee (id, firstName, lastName, ID\_number, phoneNumber, email, jobtitle\_id, department)  
employmentStatus(id, employee\_id, company\_id, status(Pending, Active, Probation, Resigned, Terminated)

**Company Admin**

- Manage departments, Add new department (save in company\_department table, (id, department\_id, company\_id description, status, createdBy)  
- Job title(id, employeeTitle\_id, department\_id, description, status)  
- Adjust company logo, change company unique password  
- Assign department and job title to the employee


**Applicants**

- id, firstName, lastName, ID, phoneNumber, email, application\_reference\_code, status(pending, reviewed, interviewed, passed\_interview, failed\_interview, sat\_for\_exam, passed\_exam, failed\_exam,recruited, awaiting\_for\_recruitment, rejected), history::JSONB({status, doneBy, doneAt, comment}), jobTitle\_id)


//FIXME: optimisation for handling these documents and consider company ownership  
**employeeDocuments**(id, type(CV, ID, CONTRACT, CRIMINAL\_CERTIFICATE, MEDICAL\_REPORT, RESIGNATION\_LETTER, EXPERIENCE\_LETTER, CLEARENCE\_LETTER), status(active, replaced), employee\_id)

**applicantDocuments**(id, type(CV, ID, CONTRACT, CRIMINAL\_CERTIFICATE, MEDICAL\_REPORT, RESIGNATION\_LETTER, EXPERIENCE\_LETTER, CLEARENCE\_LETTER), status(active, replaced), applicant\_id)  
//FIXME: optimisation for handling these document

Company Policy  
 Type:  
  1\. Onboarding policy  
    \- Employees documents must be (CV, ID, CONTRACT, CRIMINAL\_CERTIFICATE, MEDICAL\_REPORT), and if policy set, we should know employees that do not meet policy  
   2\. Offboarding policy

- Employees document must be (RESIGNATION\_LETTER, EXPERIENCE\_LETTER, CLEARENCE\_LETTER  
  ) and if policy set, we should know employees that do not meet policy  
    

TODOs  
1\. AWS S3bucket for storing documents(employee related, company related)  
2\. HRMS gmail account for handling OTP sending to the user’s email  
3\. Domain name \+ SSL certificate  
4\. Postgres database (AWS RDMS)  
5\. Application server (AWS EC2)  
6\. Tasks arrangement (Every Week)  
7\. 

