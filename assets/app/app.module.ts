import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from '../environments/environment'
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from "@angular/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import * as firebase from 'firebase';
import {HeaderService} from './services/header.service';
import { FooterComponent } from './footer/footer.component';
import { SendEmailService } from './services/sendEmail.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from './services/auth.service';
import { ProfileUserService } from './services/profileUser.service';
import { ProfileClientService } from './services/profileClient.service';
import {ClientService} from './services/client.service';
import {JobService} from './services/job.service';
import {AuthGuard} from './services/auth-guard.service';
import { UserAuthGuard } from './services/user-auth-guard.service';
import { ClientAuthGuard } from  './services/client-auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCandinateComponent } from './dashboard/dashboard-candinate/dashboard-candinate.component';
import { SidebarCondinateComponent } from './dashboard/dashboard-candinate/sidebar-condinate/sidebar-condinate.component';
import { ProfileComponent } from './dashboard/dashboard-candinate/profile/profile.component';
import { ResumeComponent } from './dashboard/dashboard-candinate/resume/resume.component';
import { ChangePasswordComponent } from './dashboard/dashboard-candinate/change-password/change-password.component';
import { AppliedJobComponent } from './dashboard/dashboard-candinate/applied-job/applied-job.component';
import {ProposalsComponent} from './dashboard/dashboard-candinate/proposals/proposals.component';
import {MyApplicationComponent} from './dashboard/dashboard-candinate/my-application/my-application.component';
import { ShortlistedJobComponent } from './dashboard/dashboard-candinate/shortlisted-job/shortlisted-job.component';
import { CandinateProfileComponent } from './candinate/candinate-profile/candinate-profile.component';
import { TransactionsComponent } from './dashboard/dashboard-candinate/transactions/transactions.component';
import { CandinateListComponent } from './candinate/candinate-list/candinate-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobPostComponent } from './jobs/job-post/job-post.component';
import { EmployerListComponent } from './employer/employer-list/employer-list.component';
import {EmployerProfileComponent} from './employer/employer-profile/employer-profile.component';
import { ChangePasswordClientComponent } from './dashboard/dashboard-client/change-password-client/change-password-client.component';
import { DashboardClientComponent } from './dashboard/dashboard-client/dashboard-client.component';
import { SidebarClientComponent } from './dashboard/dashboard-client/sidebar-client/sidebar-client.component';
import { PostJobComponent } from './dashboard/dashboard-client/post-job/post-job.component';
import { ManageJobComponent } from './dashboard/dashboard-client/manage-job/manage-job.component';
import { TransactionsClientComponent } from './dashboard/dashboard-client/transactions-client/transactions-client.component';
import { EditProfileClientComponent } from './dashboard/dashboard-client/edit-profile-client/edit-profile-client.component';
import { PaymentJobComponent } from './dashboard/dashboard-client/post-job/payment-job/payment-job.component';
import { DonePostComponent } from './dashboard/dashboard-client/post-job/done-post/done-post.component';
import { AllApplicationsComponent } from './dashboard/dashboard-client/all-applications/all-applications.component';
import { ApplicationComponent } from './dashboard/dashboard-client/application/application.component';
import { ApplyJobComponent } from './jobs/apply-job/apply-job.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { TermComponent } from './term/term.component';
import { Page404Component } from './page-404/page-404.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { HomeComponent } from './home/home.component';
import { CandinateStartComponent } from './dashboard/dashboard-candinate/candinate-start/candinate-start.component';
import { ClientStartComponent } from './dashboard/dashboard-client/client-start/client-start.component';
import { ContractComponent } from './dashboard/dashboard-client/contract/contract.component';
import {FeedBackToUserComponent} from './dashboard/dashboard-client/FeedBack/FeedBackToUser.component';
import {FeedBackToClientComponent} from './dashboard/dashboard-candinate/FeedBack/FeedBackToClient.component';
import { SidebarBlogComponent } from './blog/sidebar-blog/sidebar-blog.component';
import { BlogPostsComponent } from './blog/blog-posts/blog-posts.component';
import { NavberMobileComponent } from './header/navber-mobile/navber-mobile.component';
import {UserService} from './services/user.service';
import {CreatePostComponent} from './blog/create-post/create-post.component';
import {PostService} from './services/post.service';
import {AppService} from './services/app.service';
import {ContractService} from './services/contract.service';
import {CommentService} from './services/comment.service';
import {MyPostsComponent } from './blog/my-posts/my-posts.component'
const appRoutes: Routes = [
  {path:'',component :HomeComponent},
  {path:'Home',component :HomeComponent},
  {path:'Login',component :LoginComponent},
  {path:'SignUp',component :SignUpComponent},
  {path:'Candinate/Profile',component :CandinateProfileComponent,canActivate: [AuthGuard]},
  {path:'Candinate/Profile/:id',component :CandinateProfileComponent,canActivate: [AuthGuard]},
  {path:'CandinateList',component :CandinateListComponent,canActivate: [AuthGuard]},
  {path:'JobsList',component :JobListComponent,canActivate: [AuthGuard]},
  {path:'JobsList/:title/:city',component :JobListComponent,canActivate: [AuthGuard]},
  {path:'JobsPost/:id',component :JobPostComponent,canActivate: [AuthGuard]},
  {path:'ApplyJob/:id',component :ApplyJobComponent,canActivate: [AuthGuard,UserAuthGuard]},
  {path:'Employer/Profile',component :EmployerProfileComponent,canActivate: [AuthGuard]},
  {path:'EmployerList',component :EmployerListComponent,canActivate: [AuthGuard]},
  {path:'AboutUs',component :AboutUsComponent},
  {path:'ContactUs',component :ContactUsComponent},
  {path:'FAQ',component :FaqComponent},
  {path:'TermAndCondition',component :TermComponent},
  {path:'HowItWorks',component :HowItWorksComponent},
  {path:'Blog',component :BlogComponent,canActivate: [AuthGuard,UserAuthGuard],children:[
    {path:'',component :BlogPostsComponent},
    {path:'BlogPost/:id',component :BlogPostComponent},
    {path:'createPost',component :CreatePostComponent},
    {path:'createPost/:id',component :CreatePostComponent},
    {path:'myPosts',component :MyPostsComponent},
  ]},
  {path:'DashboardUser',component:DashboardCandinateComponent,canActivate: [AuthGuard,UserAuthGuard] ,children:[
    {path:'',component :CandinateStartComponent},
    {path:'AppliedJobs',component :AppliedJobComponent},
    {path:'ShortlistedJobs',component :ShortlistedJobComponent},
    {path:'MyProfile',component :ProfileComponent},
    {path:'MyApplication/:id' ,component :MyApplicationComponent},
    {path:'Proposals',component :ProposalsComponent},
    {path:'Transactions',component :TransactionsComponent},
    {path:'FeedBackToClient/:id/:type',component :FeedBackToClientComponent},
    {path:'ChangePassword',component :ChangePasswordComponent},
  ]},
  {path:'DashboardClient',component:DashboardClientComponent, canActivate: [AuthGuard,ClientAuthGuard] ,children:[
    {path:'',component :ClientStartComponent},
    {path:'ChangePassword',component :ChangePasswordClientComponent},
    {path:'PostJob',component :PostJobComponent},
    {path:'PostJob/:id',component :PostJobComponent},
    {path:'PayementSetting',component :PaymentJobComponent},
    {path:'Done',component :DonePostComponent},
    {path:'AllApplications/:id',component :AllApplicationsComponent},
    {path:'Application/:id',component :ApplicationComponent},
    {path:'ManageJobs',component :ManageJobComponent},
    {path:'ActivatedContract',component :ContractComponent},
    {path:'FeedBackToUser/:id/:type',component :FeedBackToUserComponent},
    {path:'Transactions',component :TransactionsClientComponent},
    {path:'MyProfile',component :EditProfileClientComponent}
  ]},
  {path:'**',component :Page404Component}
];
@NgModule({
  declarations: [
    FeedBackToUserComponent,
    CreatePostComponent,
    FeedBackToClientComponent,
    MyPostsComponent,
    AppComponent,
    MyApplicationComponent,
    HeaderComponent,
    FooterComponent,
    ContractComponent,
    LoginComponent,
    SignUpComponent,
    DashboardCandinateComponent,
    ProposalsComponent,
    SidebarCondinateComponent,
    ProfileComponent,
    ResumeComponent,
    ChangePasswordComponent,
    AppliedJobComponent,
    ShortlistedJobComponent,
    CandinateProfileComponent,
    TransactionsComponent,
    CandinateListComponent,
    JobListComponent,
    JobPostComponent,
    EmployerListComponent,
    EmployerProfileComponent,
    ChangePasswordClientComponent,
    DashboardClientComponent,
    SidebarClientComponent,
    PostJobComponent,
    ManageJobComponent,
    TransactionsClientComponent,
    EditProfileClientComponent,
    PaymentJobComponent,
    DonePostComponent,
    AllApplicationsComponent,
    ApplicationComponent,
    ApplyJobComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    HowItWorksComponent,
    TermComponent,
    Page404Component,
    BlogComponent,
    BlogPostComponent,
    HomeComponent,
    CandinateStartComponent,
    ClientStartComponent,
    SidebarBlogComponent,
    BlogPostsComponent,
    NavberMobileComponent,
  ],
  imports: [
    BrowserModule,
   MatMomentDateModule,
   MatInputModule,
   ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    HttpModule ,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSliderModule,
    MatTableModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB86I1gLxCFm5Cm0J4fxUajnroSq7bYjMw'
    })
  ],
  entryComponents:[NavberMobileComponent],
  providers: [RouterModule,AuthService,UserService,AuthGuard,UserAuthGuard,ClientAuthGuard,ProfileUserService,PostService,CommentService,ProfileClientService,ClientService,JobService,AppService,HeaderService,ContractService,SendEmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
