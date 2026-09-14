import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  FaSignInAlt,
  FaUserPlus,
  FaClock,
  FaFileAlt,
  FaArrowRight,
  FaCheckCircle,
  FaUniversity,
  FaMapMarkerAlt,
  FaLock,
  FaClipboardList
} from 'react-icons/fa';

import Brand from '../components/Brand';
import './Home.css';

export default function Home() {

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('candidate_session');

    if (raw) {
      try {
        const cand = JSON.parse(raw);

        if (cand && cand.registrationId) {
          setCandidate(cand);
        }
      } catch (error) {
        console.error('Session error:', error);
      }
    }
  }, []);

  return (

    <div className="home-page">

      <div className="home-bg-shape home-bg-shape-one"></div>
      <div className="home-bg-shape home-bg-shape-two"></div>

      <div className="home-container">

        {/* ================= HEADER ================= */}

        <header className="home-header">

          <div className="home-brand-wrap">
            <Brand />
          </div>

          <div className="home-title-section">

            <div className="college-badge">
              <FaUniversity />
              Faculty Recruitment Portal
            </div>

            <h1>
              ALL INDIA JAT HEROES'
              <span> MEMORIAL COLLEGE</span>
            </h1>

            <p className="college-affiliation">
              Affiliated to Maharshi Dayanand University, Rohtak
            </p>

            <p className="home-subtitle">
              Online Application Portal for Faculty Recruitment
            </p>

            <div className="home-location">
              <FaMapMarkerAlt />
              Rohtak, Haryana
            </div>

          </div>

        </header>


        {/* ================= TOP TWO BOXES ================= */}

        <div className="home-top-grid">


          {/* ================= CANDIDATE PORTAL ================= */}

          <section className="portal-card">

            <div className="portal-card-header">

              <div className="portal-icon">
                <FaClipboardList />
              </div>

              <div>
                <span>ONLINE RECRUITMENT</span>
                <h2>Candidate Portal</h2>
              </div>

            </div>


            <div className="portal-card-body">

              {candidate && (

                <div className="active-session">

                  <div className="active-session-top">

                    <div className="session-status">
                      <span className="status-dot"></span>
                      ACTIVE SESSION
                    </div>

                    <FaCheckCircle />

                  </div>

                  <h3>
                    {candidate.candidateName || 'Candidate'}
                  </h3>

                  <p>
                    Registration No:
                    <strong>
                      {candidate.registrationNo || 'N/A'}
                    </strong>
                  </p>

                  <Link
                    to="/application"
                    className="resume-btn"
                  >
                    Resume Application
                    <FaArrowRight />
                  </Link>

                </div>

              )}


              <div className="portal-welcome">

                <h3>
                  Welcome to the Application Portal
                </h3>

                <p>
                  Login to continue your application or register
                  as a new candidate.
                </p>

              </div>


              <Link
                className="home-login"
                to="/login"
              >

                <span className="portal-btn-icon">
                  <FaSignInAlt />
                </span>

                <span>
                  <strong>
                    Candidate Login
                  </strong>

                  <small>
                    Continue your application
                  </small>
                </span>

                <FaArrowRight className="btn-arrow" />

              </Link>


              <Link
                className="home-register"
                to="/register"
              >

                <span className="portal-btn-icon">
                  <FaUserPlus />
                </span>

                <span>

                  <strong>
                    New Candidate Registration
                  </strong>

                  <small>
                    Create your account to apply
                  </small>

                </span>

                <FaArrowRight className="btn-arrow" />

              </Link>


              <div className="home-help-section">

                <p>
                  Need help with your account?
                </p>

                <div className="home-links">

                  <Link to="/forgot-password">
                    Forgot Password
                  </Link>

                  {/* <Link to="/forgot-application">
                    Application No
                  </Link> */}

                  <Link to="/forgot-registration">
                    Registration No
                  </Link>

                </div>

              </div>

            </div>


            <div className="portal-footer">

              <FaLock />

              Secure Candidate Recruitment Portal

            </div>

          </section>


          {/* ================= IMPORTANT INSTRUCTIONS ================= */}

          <section className="instruction-card">

            <div className="section-heading">

              <div className="section-icon">
                <FaClipboardList />
              </div>

              <div>

                <span>
                  PLEASE READ CAREFULLY
                </span>

                <h2>
                  Important Instructions
                </h2>

              </div>

            </div>


            <div className="instruction-list">

              <div className="instruction-item">

                <span className="instruction-number">
                  01
                </span>

                <p>
                  Keep scanned copies of photograph,
                  signature and all required certificates ready.
                </p>

              </div>


              <div className="instruction-item">

                <span className="instruction-number">
                  02
                </span>

                <p>
                  Application fee is applicable.
                  Keep your UTR number and payment
                  screenshot ready.
                </p>

              </div>


              <div className="instruction-item">

                <span className="instruction-number">
                  03
                </span>

                <p>
                  Fill all 16 application steps carefully.
                  Your progress is automatically saved.
                </p>

              </div>


              <div className="instruction-item">

                <span className="instruction-number">
                  04
                </span>

                <p>
                  A consolidated application PDF will
                  be generated after final submission.
                </p>

              </div>


              <div className="instruction-item">

                <span className="instruction-number">
                  05
                </span>

                <p>
                  Submit the required hard copies along
                  with testimonials as instructed.
                </p>

              </div>

            </div>


            <a
              href="https://udbhhoxrstnjytgxpwje.supabase.co/storage/v1/object/public/tenant-assets/tenants/all-india-jat-heroes-memorial-college/dummy-1788515052819.pdf"
              target="_blank"
              rel="noreferrer"
              className="dummy-btn"
            >

              <FaFileAlt />

              Download Dummy Application Form

              <FaArrowRight />

            </a>

          </section>

        </div>


        {/* ================= FULL WIDTH HARD COPY SECTION ================= */}

        <section className="hard-card">

          <div className="hard-card-left">

            <div className="section-heading">

              <div className="section-icon hard-icon">
                📬
              </div>

              <div>

                <span>
                  AFTER FINAL SUBMISSION
                </span>

                <h2>
                  Hard Copy Submission
                </h2>

              </div>

            </div>


            <p className="hard-description">

              After successfully submitting your online application,
              please download and print the generated PDF application form.

              The printed application along with all required
              testimonials and supporting documents must be submitted
              to the concerned offices mentioned below.

            </p>

          </div>


          <div className="address-list">


            <div className="address-item">

              <span>1</span>

              <p>
                <strong>
                  Dean, College Development Council
                </strong>

                Maharshi Dayanand University,
                Rohtak, Haryana
              </p>

            </div>


            <div className="address-item">

              <span>2</span>

              <p>
                <strong>
                  Directorate General of Higher Education
                </strong>

                Shiksha Sadan,
                Sector-5, Panchkula, Haryana
              </p>

            </div>


            <div className="address-item">

              <span>3</span>

              <p>
                <strong>
                  Office of the President
                </strong>

                Jat Education Society (Regd.),
                Rohtak, Haryana
              </p>

            </div>

          </div>

        </section>


        {/* ================= DEADLINE ================= */}

        <div className="deadline">

          <div className="deadline-icon">
            <FaClock />
          </div>

          <div>

            <span>
              APPLICATION DEADLINE
            </span>

            <strong>
              30 November 2026
            </strong>

            <small>
              Submit your application before 11:59 PM
            </small>

          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <footer className="home-bottom-footer">

          <span>
            JES(Regd.) Rohtak  Recruitment Portal © 2026
          </span>

          <span className="footer-divider">
            •
          </span>

          <span>
            All Rights Reserved
          </span>

        </footer>


      </div>

    </div>

  );

}